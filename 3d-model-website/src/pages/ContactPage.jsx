import { useEffect, useState } from 'react';
import STLUploadForm from "../components/STLUploadForm";

// Contact page component
function ContactPage() {
  const [prefilledSignModel, setPrefilledSignModel] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('source');
    const message = params.get('message');
    const storedRequest = sessionStorage.getItem('utskriftslabbet-sign-request');

    if (source === 'sign-builder' && storedRequest) {
      const parsed = JSON.parse(storedRequest);
      setPrefilledSignModel({
        filename: parsed.filename,
        message: parsed.message || message || '',
        base64: parsed.base64 || '',
      });
      return;
    }

    if (source === 'sign-builder' && message) {
      setPrefilledSignModel({
        filename: params.get('filename') || 'custom-sign.stl',
        message,
        base64: '',
      });
    }
  }, []);

  const params = new URLSearchParams(window.location.search);
  const filename = params.get("filename");

  return (
    <div>
      <section className="hero">
        <h1>Kontakta oss</h1>
        <p>Redo att Skriva ut dina idéer? Kontakta oss idag!</p>
      </section>

      {prefilledSignModel && (
        <div className="card" style={{ marginBottom: '20px', padding: '16px 20px', borderLeft: '4px solid var(--color-primary)' }}>
          <strong>Skyltmodellen är förifylld i formuläret.</strong>
        </div>
      )}

      <section className="grid grid-2">
        <div className="card" style={{height: '100%', top: '20px'}}>
          <STLUploadForm filename={filename} prefilledSignModel={prefilledSignModel} />
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