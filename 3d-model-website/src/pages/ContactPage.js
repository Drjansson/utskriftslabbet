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
        <div className="card" style={{height: '100%', position: 'sticky', top: '20px'}}>
          <STLUploadForm filename={filename} />
        </div>

        <div className="card" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <h3>Kontaktinformation</h3>
          <div style={{marginBottom: '24px', marginTop: '24px'}}>
            <h4>Adress</h4>
            <p>
              Uppsala, Sverige
            </p>
          </div>
          <div style={{marginBottom: '24px', display: 'none'}}>
            <h4>Telefon</h4>
            <p>(555) 123-4567</p>
          </div>
          <div style={{marginBottom: '24px'}}>
            <h4>E-post</h4>
            <p>utskriftslabbet@gmail.com</p>
          </div>
          <div style={{marginTop: 'auto', paddingBottom: '40px'}}>
            <p>Informationen du anger i detta formulär kommer att sparas under tiden som projektet är igång och tas därefter bort.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
export default ContactPage;