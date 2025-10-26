import STLUploadForm from "../components/STLUploadForm";

// Contact page component
function ContactPage() {

  const params = new URLSearchParams(window.location.search);
  const filename = params.get("filename");

  return (
    <div>
      <section className="hero">
        <h1>Kontakta oss</h1>
        <p>Redo att Skriva ut dina idéer? Kontakta oss idag!</p>
      </section>

      <section className="grid grid-2">
        <STLUploadForm filename={filename} />

        <div className="card">
          <h3>Kontaktinformation</h3>
          <div style={{marginBottom: '24px'}}>
            <h4>Adress</h4>
            <p>
              Uppsala, Sverige
            </p>
          </div>
          
          <div style={{marginBottom: '24px'}}>
            <h4>Telefon</h4>
            <p>(555) 123-4567</p>
          </div>
          
          <div style={{marginBottom: '24px'}}>
            <h4>E-post</h4>
            <p>utskriftslabbet@gmail.com</p>
          </div>
          
          <div style={{marginBottom: '24px'}}>
            <h4>Öppettider</h4>
            <p>
              Måndag - Fredag: 09:00 - 18:00<br />
              Lördag: 10:00 - 16:00<br />
              Söndag: Stängt
            </p>
          </div>
          
          <div>
            <h4>Filuppladdning</h4>
            <p>För stora filer eller detaljerade offerter, maila dina 3D-modeller direkt till:</p>
            <p><strong>utskriftslabbet@gmail.com</strong></p>
            <p>Godkända format: .STL, .OBJ, .3MF, .STEP, .STP, .AMF</p>
          </div>
        </div>
      </section>

    </div>
  );
}
export default ContactPage;