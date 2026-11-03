import { useEffect, useState } from 'react';
import JSZip from 'jszip';

function buildBoxMesh(x, y, z, width, height, depth) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;
  const z1 = z;
  const z2 = z + depth;

  const vertices = [
    [x1, y1, z1], [x2, y1, z1], [x2, y2, z1], [x1, y2, z1],
    [x1, y1, z2], [x2, y1, z2], [x2, y2, z2], [x1, y2, z2],
  ];

  const triangles = [
    [0, 1, 2], [0, 2, 3],
    [4, 6, 5], [4, 7, 6],
    [0, 4, 5], [0, 5, 1],
    [1, 5, 6], [1, 6, 2],
    [2, 6, 7], [2, 7, 3],
    [3, 7, 4], [3, 4, 0],
  ];

  return { vertices, triangles };
}

function buildPolygonPrism(points, depth) {
  const bottom = points.map(([x, y]) => [x, y, 0]);
  const top = points.map(([x, y]) => [x, y, depth]);
  const vertices = [...bottom, ...top];
  const triangles = [];

  for (let i = 1; i < points.length - 1; i += 1) {
    triangles.push([0, i, i + 1]);
    triangles.push([points.length, points.length + i + 1, points.length + i]);
  }

  for (let i = 0; i < points.length; i += 1) {
    const next = (i + 1) % points.length;
    const a = i;
    const b = next;
    const c = points.length + next;
    const d = points.length + i;
    triangles.push([a, b, c], [a, c, d]);
  }

  return { vertices, triangles };
}

function buildTextBlockMesh(text, x, y, width, height, depth, fontSize, fontWeight = 700) {
  if (!text || !String(text).trim()) {
    return { vertices: [], triangles: [] };
  }

  if (typeof document === 'undefined') {
    return { vertices: [], triangles: [] };
  }

  const canvas = document.createElement('canvas');
  const sampleStep = 2;
  const canvasWidth = Math.max(240, Math.ceil(width * 3));
  const canvasHeight = Math.max(160, Math.ceil(height * 3));
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.fillStyle = '#000000';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = `${fontWeight} ${fontSize * 2.8}px Arial, sans-serif`;

  const lines = String(text).split(/\n/);
  const lineHeight = fontSize * 2.6;
  const totalTextHeight = Math.max(1, lines.length * lineHeight);
  const startY = (canvasHeight - totalTextHeight) / 2 + lineHeight / 2;

  lines.forEach((line, index) => {
    const effectiveLine = line || ' ';
    context.fillText(effectiveLine, canvasWidth / 2, startY + index * lineHeight);
  });

  const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight).data;
  const blocks = [];

  for (let py = 0; py < canvasHeight; py += sampleStep) {
    for (let px = 0; px < canvasWidth; px += sampleStep) {
      let alphaSum = 0;

      for (let dy = 0; dy < sampleStep; dy += 1) {
        for (let dx = 0; dx < sampleStep; dx += 1) {
          const sampleX = Math.min(canvasWidth - 1, px + dx);
          const sampleY = Math.min(canvasHeight - 1, py + dy);
          const index = (sampleY * canvasWidth + sampleX) * 4 + 3;
          alphaSum += imageData[index] || 0;
        }
      }

      if (alphaSum > 90) {
        const blockWidth = (sampleStep * width) / canvasWidth;
        const blockHeight = (sampleStep * height) / canvasHeight;
        const blockX = x + (px / canvasWidth) * width;
        const blockY = y + ((canvasHeight - py - sampleStep) / canvasHeight) * height;
        blocks.push([blockX, blockY, blockWidth, blockHeight]);
      }
    }
  }

  if (!blocks.length) {
    return { vertices: [], triangles: [] };
  }

  const vertices = [];
  const triangles = [];

  blocks.forEach(([blockX, blockY, blockWidth, blockHeight]) => {
    const mesh = buildBoxMesh(blockX, blockY, 0, blockWidth, blockHeight, depth);
    const vertexOffset = vertices.length;
    vertices.push(...mesh.vertices);
    mesh.triangles.forEach(([v1, v2, v3]) => {
      triangles.push([v1 + vertexOffset, v2 + vertexOffset, v3 + vertexOffset]);
    });
  });

  return { vertices, triangles };
}

function createSign3MF({ width, height, borderWidth, addTriangle, textSize, text, headerText, headerSize, headerGap }) {
  const mmWidth = width * 0.5;
  const mmHeight = height * 0.5;
  const baseDepth = 4;
  const borderDepth = 2;
  const textDepth = 2;

  const signBodyPoints = addTriangle
    ? [
        [0, 0],
        [mmWidth * 0.68, 0],
        [mmWidth, mmHeight * 0.5],
        [mmWidth * 0.68, mmHeight],
        [0, mmHeight],
      ]
    : [
        [0, 0],
        [mmWidth, 0],
        [mmWidth, mmHeight],
        [0, mmHeight],
      ];

  const textAreaWidth = mmWidth * 0.72;
  const textAreaHeight = mmHeight * 0.62;
  const textAreaX = (mmWidth - textAreaWidth) / 2;
  const textAreaY = addTriangle
    ? (mmHeight - textAreaHeight) / 2 + 5
    : (mmHeight - textAreaHeight) / 2;

  const borderAreaX = textAreaX - borderWidth * 0.5;
  const borderAreaY = textAreaY - borderWidth * 0.5;
  const borderAreaW = textAreaWidth + borderWidth;
  const borderAreaH = textAreaHeight + borderWidth;

  const headerHeight = Math.max(14, (headerSize / 10) * 2.6);
  const textBandY = textAreaY + (headerText ? headerHeight + headerGap : 0);

  const baseMesh = buildPolygonPrism(signBodyPoints, baseDepth);
  const borderMesh = buildBoxMesh(borderAreaX, borderAreaY, baseDepth, borderAreaW, borderAreaH, borderDepth);

  const textMesh = buildTextBlockMesh(
    text || 'Skylt',
    textAreaX,
    textBandY,
    textAreaWidth,
    textAreaHeight * 0.72,
    textDepth,
    textSize,
    700,
  );

  const headerMesh = headerText
    ? buildTextBlockMesh(
        headerText,
        (mmWidth - textAreaWidth) / 2,
        textAreaY,
        textAreaWidth,
        headerHeight,
        textDepth,
        headerSize,
        700,
      )
    : null;

  const parts = [
    { id: 1, name: 'base', mesh: baseMesh, materialIndex: 0 },
    { id: 2, name: 'border', mesh: borderMesh, materialIndex: 1 },
    { id: 3, name: 'text', mesh: textMesh, materialIndex: 2 },
  ];

  if (headerMesh) {
    parts.push({ id: 4, name: 'header', mesh: headerMesh, materialIndex: 3 });
  }

  return parts;
}

function build3MFXml(parts) {
  const materialColors = {
    base: '#d9d5cf',
    border: '#1f2937',
    text: '#0f172a',
    header: '#0f172a',
  };

  const resources = parts
    .map((part) => {
      const vertices = part.mesh.vertices
        .map(([x, y, z]) => `<vertex x="${x.toFixed(3)}" y="${y.toFixed(3)}" z="${z.toFixed(3)}"/>`)
        .join('');

      const triangles = part.mesh.triangles
        .map(([v1, v2, v3]) => `<triangle v1="${v1}" v2="${v2}" v3="${v3}"/>`)
        .join('');

      return `
      <object id="${part.id}" type="model" name="${part.name}">
        <mesh>
          <vertices>
            ${vertices}
          </vertices>
          <triangles>
            ${triangles}
          </triangles>
        </mesh>
      </object>`;
    })
    .join('');

  const materials = `
    <basematerials id="1">
      ${parts.map((part) => `<base name="${part.name}" displaycolor="${materialColors[part.name] || '#d9d5cf'}"/>`).join('')}
    </basematerials>`;

  const items = parts
    .map((part) => `<item objectid="${part.id}" transform="1 0 0 0 1 0 0 0 1 0 0 0" pid="1" pindex="${part.materialIndex}"/>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">
  <resources>
    ${materials}
    ${resources}
  </resources>
  <build>
    ${items}
  </build>
</model>`;
}

function generate3MFFile(parts) {
  const zip = new JSZip();

  zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/3D/3dmodel.model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>
</Types>`);

  zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" Target="3D/3dmodel.model"/>
</Relationships>`);

  zip.file('3D/3dmodel.model', build3MFXml(parts));

  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
}

function SignBuilderPage() {
  const [text, setText] = useState('Välkommen\nTill\nUtskriftsLabbet');
  const [headerText, setHeaderText] = useState('Gårdsbutik');
  const [width, setWidth] = useState(360);
  const [height, setHeight] = useState(180);
  const [textSize, setTextSize] = useState(42);
  const [headerSize, setHeaderSize] = useState(26);
  const [headerGap, setHeaderGap] = useState(18);
  const [borderWidth, setBorderWidth] = useState(8);
  const [addTriangle, setAddTriangle] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const isVertical = addTriangle;

  useEffect(() => {
    const lines = (text || '').split(/\n/);
    const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
    const estimatedWidth = Math.max(140, longestLine * Math.max(10, textSize * 0.6) + 80);
    const estimatedHeight = Math.max(120, lines.length * Math.max(18, textSize * 1.1) + (headerText.trim() ? headerSize + headerGap + 60 : 80));

    setWidth((currentWidth) => Math.min(600, Math.max(currentWidth, Math.min(600, estimatedWidth))));
    setHeight((currentHeight) => Math.min(500, Math.max(currentHeight, Math.min(500, estimatedHeight))));
  }, [text, textSize, headerText, headerSize, headerGap]);

  const export3MF = async () => {
    setIsExporting(true);

    try {
      const normalizedText = text.trim() || 'Skylt';
      const fileName = `${normalizedText.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'custom-sign'}.3mf`;
      const blob = await generate3MFFile(createSign3MF({
        width,
        height,
        borderWidth,
        addTriangle,
        textSize,
        text,
        headerText,
        headerSize,
        headerGap,
      }));

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  const sendSignToContact = () => {
    const normalizedText = text.trim() || 'Skylt';
    const header = (headerText || '').trim();
    const fileName = `${normalizedText.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'custom-sign'}.3mf`;
    const message = `Hej! Jag vill beställa den här skyltmodellen i 3MF-format med separata lager för bas, text och ram.\n\nSkylttext: ${normalizedText}\nHeader: ${header || 'Ingen'}\nStorlek: ${width} mm x ${height} mm\nRam: ${borderWidth} mm\nVertikal: ${addTriangle ? 'Ja' : 'Nej'}\n\nSkyltmodellen kommer att vara förifylld i formuläret.`;

    const signRequest = {
      filename: fileName,
      message,
      base64: '',
      source: 'sign-builder',
    };

    sessionStorage.setItem('utskriftslabbet-sign-request', JSON.stringify(signRequest));

    const targetUrl = `/contact?filename=${encodeURIComponent(fileName)}&source=sign-builder&message=${encodeURIComponent(message)}`;
    window.history.pushState({}, '', targetUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="sign-builder-page">
      <section className="hero">
        <h1>Designa din skylt</h1>
        <p>Skapa skyltmodeller direkt i webbläsaren med separata lager för bas, text och ram. Exportera som .3mf för utskrift.</p>
      </section>

      <section className="card sign-builder-layout">
        <div className="sign-builder-controls">
          <div className="form-group">
            <label className="form-label" htmlFor="sign-text">Skylttext</label>
            <textarea
              id="sign-text"
              className="form-control"
              rows={4}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Skriv din text här\nNy rad med Enter"
            />
          </div>

          {!isVertical && (
            <div className="form-group">
              <label className="form-label" htmlFor="sign-header">Header</label>
              <input
                id="sign-header"
                className="form-control"
                type="text"
                value={headerText}
                onChange={(event) => setHeaderText(event.target.value)}
                placeholder="Skriv en header"
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="sign-width">Bredd: {width} mm</label>
            <input
              id="sign-width"
              className="range-input"
              type="range"
              min="80"
              max="600"
              value={width}
              onChange={(event) => setWidth(Number(event.target.value))}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="sign-height">Höjd: {height} mm</label>
            <input
              id="sign-height"
              className="range-input"
              type="range"
              min="80"
              max="500"
              value={height}
              onChange={(event) => setHeight(Number(event.target.value))}
            />
          </div>

          {!isVertical && (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="sign-header-size">Headerstorlek: {headerSize}px</label>
                <input
                  id="sign-header-size"
                  className="range-input"
                  type="range"
                  min="16"
                  max="72"
                  value={headerSize}
                  onChange={(event) => setHeaderSize(Number(event.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="sign-gap">Avstånd mellan header och text: {headerGap}px</label>
                <input
                  id="sign-gap"
                  className="range-input"
                  type="range"
                  min="0"
                  max="60"
                  value={headerGap}
                  onChange={(event) => setHeaderGap(Number(event.target.value))}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="sign-font-size">Textstorlek: {textSize}px</label>
            <input
              id="sign-font-size"
              className="range-input"
              type="range"
              min="16"
              max="96"
              value={textSize}
              onChange={(event) => setTextSize(Number(event.target.value))}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="sign-border">Ram: {borderWidth}px</label>
            <input
              id="sign-border"
              className="range-input"
              type="range"
              min="2"
              max="30"
              value={borderWidth}
              onChange={(event) => setBorderWidth(Number(event.target.value))}
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label" htmlFor="triangle-toggle">
              <input
                id="triangle-toggle"
                type="checkbox"
                checked={addTriangle}
                onChange={(event) => setAddTriangle(event.target.checked)}
              />
              Vertikal skylt med triangel för markstöd
            </label>
          </div>

          <div className="sign-builder-actions">
            <button type="button" className="btn btn--primary" onClick={export3MF} disabled={isExporting}>
              {isExporting ? 'Exporterar 3MF…' : 'Exportera .3mf'}
            </button>
            <button type="button" className="btn btn--secondary" onClick={sendSignToContact} style={{ marginTop: '12px' }}>
              Skicka till utskrift
            </button>
          </div>

          <p className="sign-builder-note">
            Skyltmodellen kommer att vara förifylld i kontaktformuläret innan du skickar den för utskrift.
          </p>
        </div>

        <div className="sign-builder-preview">
          <div className="sign-preview-label">Förhandsvisning</div>

          <div className="sign-stage">
            <div className="sign-preview-panel">
              <div className="sign-scale sign-scale--width">
                {Array.from({ length: 11 }, (_, index) => (
                  <span key={index} className="scale-mark" style={{ width: index === 0 || index === 10 ? '4px' : '2px', height: '14px' }} />
                ))}
                <span className="scale-label">{width} mm</span>
              </div>

              <div className="sign-preview-visual">
                <div className="sign-scale sign-scale--height">
                  {Array.from({ length: 11 }, (_, index) => (
                    <span key={index} className="scale-mark" style={{ width: '14px', height: index === 0 || index === 10 ? '4px' : '2px' }} />
                  ))}
                  <span className="scale-label">{height} mm</span>
                </div>

                <div
                  className={`sign ${isVertical ? 'sign--vertical' : 'sign--horizontal'}`}
                  style={{ width: `${Math.min(width, 520)}px`, height: `${Math.min(height, 320)}px` }}
                >
                  <div className="sign__body">
                    {!isVertical && (
                      <div className="sign__header" style={{ fontSize: `${headerSize}px`, marginBottom: `${headerGap}px` }}>
                        {headerText.trim() || 'Header'}
                      </div>
                    )}
                    <div className="sign__text" style={{ fontSize: `${textSize}px`, borderWidth: `${borderWidth}px` }}>
                      {text.trim() || 'Din text'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignBuilderPage;
