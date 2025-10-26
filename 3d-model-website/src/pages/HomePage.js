import { Link } from '../App';

function HomePage() {
  return (
    <div>
      <section className="hero">
        <h1>3D Model Printing</h1>
        <p>Förvandla dina digitala designer till fysiska modeller med hjälp av en 3D skrivare.</p>
        <Link to="/contact" className="btn btn--primary btn--lg">Ta kontakt med oss</Link>
      </section>

      <section className="grid grid-2">
        <div className="card">
          <h3>Högprecisionsutskrift</h3>
          <p>Våra toppmoderna 3D-skrivare levererar exceptionella detaljer och noggrannhet för dina mest krävande projekt.</p>
        </div>
        
        <div className="card">
          <h3>Flera material</h3>
          <p>Välj bland ett brett utbud av material, inklusive PLA, PETG, TPU och PVA.</p>
        </div>
        
        <div className="card">
          <h3>Snabba leveranser</h3>
          <p>Få dina utskrivna modeller snabbt utan att kompromissa med kvaliteten. De flesta beställningar färdigställs inom 2–5 arbetsdagar.</p>
        </div>
        
        <div className="card">
          <h3>Professionell efterbehandling</h3>
          <p>Efterbehandlingstjänster som slipning, målning och montering för att leverera produktionsklara resultat.</p>
        </div>
      </section>

      <section className="card">
        <h2>Varför välja 3D Print Pro?</h2>
        <p>Vi kombinerar banbrytande teknik med gediget hantverk för att förverkliga dina idéer. Oavsett om du prototypar en ny produkt, skapar arkitekturmodeller eller producerar specialdelar har vårt team erfarenheten och utrustningen för att leverera utmärkta resultat.</p>
        <ul style={{marginTop: '16px', paddingLeft: '20px'}}>
          <li>Branschledande utskriftskvalitet och upplösning</li>
          <li>Konkurrenskraftiga priser med tydliga offerter</li>
          <li>Experthjälp genom hela projektet</li>
          <li>Säker filhantering och skydd av immateriella rättigheter</li>
          <li>Kvalitetsgaranti på alla utskrifter</li>
        </ul>
      </section>
    </div>
  );
}

export default HomePage;