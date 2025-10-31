import { Link } from '../App';

function HomePage() {
  return (
    <div>
      <section className="hero">
        <h1>3D Model Printing</h1>
        <p>Förvandla dina digitala designer till fysiska modeller med hjälp av en 3D skrivare.</p>
        <Link to="/contact" className="btn btn--primary btn--lg">Ta kontakt med oss</Link>
      </section>

      <section className="card">
        <h2>Vår process</h2>
        <div className="grid grid-2" style={{marginTop: '24px'}}>
          <div>
            <h4>1. Kontakt &amp; Filuppladdning </h4>
            <p>Använd vårt kontakt formulär för att ta kontakt med oss och ladda upp dina 3D‑filer.</p>
          </div>
          <div>
            <h4>2. Granskning </h4>
            <p>Vi granskar din modell och kollar så att vi har möjlighet att skriva ut den efterfrågade modellen. Om vi har några frågor så återkommer vi till er.</p>
          </div>
          <div>
            <h4>3. Prisförslag</h4>
            <p>Om vi tycker att modellen är passande återkommer vi med ett prisforslag. Detta beror på modellens dimensioner, material och antal delar.</p>
          </div>
          <div>
            <h4>4. Produktion</h4>
            <p>Din modell läggs i produktionskön och skrivs ut med valt material och färg. </p>
          </div>
          <div>
            <h4>5. Efterbehandling</h4>
            <p>Avlägsnande av stöd, ytbehandling och andra önskade efterbehandlingar utförs.</p>
          </div>
          <div>
            <h4>6. Leverans</h4>
            <p>Dina färdiga delar packas omsorgsfullt och skickas med önskat leveranssätt.</p>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Vanliga frågor</h2>
        <div className="grid grid-2" style={{marginTop: '24px'}}>
          <div>
            <h4>Vilka filformat accepterar ni?</h4>
            <p>Vi accepterar 3D-filformaten .STL, .OBJ, .3MF, .STEP, .STP, .SVG, .AMF. Har du ett annat format? Kontakta oss så löser vi det.</p>
          </div>
          <div>
            <h4>Vilka material kan ni skriva ut med?</h4>
            <p>
              <ul style={{paddingLeft: '20px'}}>
                <li>PLA</li>
                <li>PETG</li>
                <li>TPU</li>
                <li style={{display:'none'}}><strong>PVA</strong> – Vattenlösligt, idealiskt som stödmaterial vid dubbel-extrusion</li>
              </ul>
          </p> 
          </div>
          <div>
            <h4>Hur lång är ledtiden?</h4>
            <p>De flesta beställningar färdigställs inom 1–3 arbetsdagar, beroende på komplexitet och antal.</p>
          </div>
          <div>
            <h4>Erbjuder ni designhjälp?</h4>
            <p>För tillfället erbjuder vi begränsad designhjälp. Kontakta oss så kan vi titta på hur vi kan hjälpa till!</p>
          </div>
          <div>
            <h4>3D-prints med fler färger?</h4>
            <p>Vi erbjuder 3D-utskrifter i en färg per beställning. Om din modell är enkel och kan delas upp i två separata delar, kan vi skriva ut varje del i olika färger – men vi kan inte blanda flera färger i samma del. Kontakta oss gärna om du har frågor om färgval eller vill dela upp din modell!</p>
          </div>
          <div>
            <h4>Vad är maximal skrivstorlek?</h4>
            <p>Vår största skrivare kan hantera föremål upp till 256 mm × 256 mm × 256 mm. För större objekt kan vi skriva i sektioner och montera ihop dem.</p>
          </div>
          <div>
            <h4>Vilket 3d-skrivare använder ni?</h4>
            <p>Vi använder skrivare ifrån Bambu Labs, modell A1.</p>
          </div>
          <div>
            <h4>Hur levereras utskrifterna?</h4>
            <p>Vi lämnar gärna över modellerna i eller runt Uppsala, efter överenskommelse.</p> 
            <p>För leveranser längre bort, skickar vi modellerna med post.</p>
          </div>
        </div>
      </section>
        
    </div>
  );
}

export default HomePage;