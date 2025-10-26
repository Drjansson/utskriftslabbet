// Informationssida komponent
function InformationPage() {
  return (
    <div>
      <section className="hero">
        <h1>Vår 3D‑utskriftstjänst</h1>
        <p>Läs om våra möjligheter, material och arbetsflöden.</p>
      </section>

      <section className="grid grid-2">
        <div className="card">
          <h3>Tekniker vi använder</h3>
          <ul style={{marginTop: '16px', paddingLeft: '20px'}}>
            <li><strong>FDM (Fused Deposition Modeling)</strong> – För hållbara, funktionella prototyper</li>
            <li><strong>SLA (Stereolithography)</strong> – För höga detaljnivåer, t.ex. miniatyrer och smycken</li>
            <li><strong>SLS (Selective Laser Sintering)</strong> – För komplexa geometrier och produktionsdelar</li>
            <li><strong>Multi Jet Fusion</strong> – För batchproduktion och funktionella prototyper</li>
          </ul>
        </div>

        <div className="card">
          <h3>Tillgängliga material</h3>
          <ul style={{marginTop: '16px', paddingLeft: '20px'}}>
            <li><strong>PLA</strong> – Biologiskt nedbrytbart, lätt att skriva ut, utmärkt för prototyper</li>
            <li><strong>PETG</strong> – Kemikalieresistent, finns i livsmedelssäkra varianter</li>
            <li><strong>TPU</strong> – Flexibelt, gummiliknande egenskaper</li>
            <li><strong>PVA</strong> – Vattenlösligt, idealiskt som stödmaterial vid dubbel-extrusion</li>
          </ul>
        </div>
      </section>

      <section className="card">
        <h2>Vår process</h2>
        <div className="grid grid-3" style={{marginTop: '24px'}}>
          <div>
            <h4>1. Filuppladdning &amp; granskning</h4>
            <p>Ladda upp dina 3D‑filer (.STL, .OBJ, .3MF, .STEP, .STP, .AMF). Vårt team granskar printbarheten och optimerar vid behov.</p>
          </div>
          <div>
            <h4>2. Offert &amp; materialval</h4>
            <p>Få en omedelbar offert och välj bland våra material- och efterbehandlingsalternativ.</p>
          </div>
          <div>
            <h4>3. Produktion</h4>
            <p>Din modell läggs i produktionskön och skrivas ut med optimala inställningar för valt material.</p>
          </div>
          <div>
            <h4>4. Kvalitetskontroll</h4>
            <p>Varje utskrift genomgår noggrann kvalitetskontroll för att säkerställa att den uppfyller våra höga krav.</p>
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
            <p>Vi accepterar .STL, .OBJ, .3MF, .STEP, .STP, .AMF och de vanligaste 3D‑filformaten. Har du ett annat format? Kontakta oss så löser vi det.</p>
          </div>
          <div>
            <h4>Hur lång är ledtiden?</h4>
            <p>De flesta beställningar färdigställs inom 2–5 arbetsdagar, beroende på komplexitet och antal. Expressleverans finns på förfrågan.</p>
          </div>
          <div>
            <h4>Erbjuder ni designhjälp?</h4>
            <p>Ja! Vårt team hjälper gärna med 3D‑modellering, designoptimering och analys för printbarhet.</p>
          </div>
          <div>
            <h4>Vad är maximal skrivstorlek?</h4>
            <p>Vår största skrivare kan hantera föremål upp till 300 mm × 300 mm × 400 mm. För större objekt kan vi skriva i sektioner och montera ihop dem.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InformationPage;