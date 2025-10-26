  
import React from 'react';

import supabase from '../SupaBaseClient';

function STLUploadForm({ filename }) {

  const fileInputRef = React.useRef();

    const [botTrap, setBotTrap] = React.useState(''); // honeypot field

  const [fileBase64, setFileBase64] = React.useState('');
  const [exampleFilename, setExampleFile] = React.useState(filename || null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [material, setMaterial] = React.useState('PLA');
  const [color, setColor] = React.useState('BLACK');
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);


  const handleFileChange = (event) => {
    setSuccess(null);
    setError(null);
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setFileBase64(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleFile = () => {
    if (!exampleFilename) return;
    
    async function fetchFileContent() {
      console.log('Fetching file content for filename:', exampleFilename);
      try {
        // Try to fetch from public folder
        const response = await fetch(`/${exampleFilename}`);
        if (!response.ok) return;
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          setFileBase64(base64String);
        };
        reader.readAsDataURL(blob);
      } catch (err) {
        // Could not fetch file
        console.error('Could not fetch STL file:', err);
      }
    }
    fetchFileContent();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    handleFile();

    if (botTrap) {
      console.warn('Bot detected — submission blocked.');
      return;
    }

    const payload = {
      name: name,
      //fileName: exampleFilename,
      email: email,
      description: message,
      material: material,
      color: color,
      stl_file: fileBase64,
    };


    // Submit to Supabase
    //  error response example:
    // {
    //   "code": 201,
    //   "message": "Created"
    // }
    
    
    const { error } = await supabase
      .from('models')
      .insert(payload)

    //console.log('Request Json:', JSON.stringify(payload));
    console.log('Submission response error:', error);

    if (error) {
      setError(error);
    } else {
      setSuccess('Form submitted successfully!');
      setFileBase64('');
      fileInputRef.current.value = '';
    }

  };

  return (
    <div>
      <h3 style={{display: 'flex', alignItems: 'center', gap: 'var(--space-8)'}}>
        <span>🔧🤖</span> Kontakta oss om 3D-modell
      </h3>

    <form onSubmit={handleSubmit}>
      <label style={{ display: 'none' }}>
        fill in this! - required
        <input
          type="text"
          name="botTrap"
          value={botTrap}
          onChange={(e) => setBotTrap(e.target.value)}
          autoComplete="off"
        />
      </label>

      <div className="form-group">
        <label className="form-label" htmlFor="name">✏️ Namn *</label>
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="Namn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">📧 E-post *</label>
        <input
        type="email"
        id="email"
        name="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">💬 Meddelande / Beskrivning</label>
        <textarea
            id="message"
            name="message"
            className="form-control"
            placeholder="Beskriv ditt projekt"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
    </div>

      <div className="form-group">
        <label className="form-label" htmlFor="material">🧱 Material</label>
        <select 
          id="material"
          className="form-control"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        >
          <option value="PLA">PLA</option>
          <option value="ABS">ABS</option>
          <option value="PETG">PETG</option>
          <option value="Resin">Resin</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="color">🎨 Färg</label>
        <select 
          id="color"
          className="form-control"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="Black">Svart</option>
          <option value="White">Vit</option>
          <option value="Red">Röd</option>
          <option value="Blue">Blå</option>
          <option value="Green">Grön</option>
          <option value="Yellow">Gul</option>
        </select>
      </div>


      {exampleFilename ? (
        <div className="form-group">
          <label className="form-label">📄 STL-fil</label>
          <div className="form-control" style={{ background: '#f5f5f5', color: '#333', cursor: 'not-allowed' }}>
            Fil vald: <strong>{exampleFilename}</strong>
          </div>
        </div>
      ) : (
        <div className="form-group">
          <label className="form-label" htmlFor="stlFile">📄 STL-fil</label>
          <input 
            ref={fileInputRef}
            id="stlFile"
            className="form-control"
            type="file" 
            accept=".stl"
            onChange={handleFileChange}
            disabled={!!exampleFilename}
          />
        </div>
      )}

      {error && (
        <div className="error-message" style={{marginBottom: '16px'}}>
          Formuläret skickades inte! Fel:
          {JSON.stringify(error)}
        </div>
      )}

      {success && (
        <div className="success-message" style={{marginBottom: '16px', color: 'green'}}>
          Formuläret skickades! - Vi återkommer på emailen ni angivit!
        </div>
      )}

  <button type="submit" disabled={!fileBase64 && !exampleFilename}>📨 Skicka</button>
    </form>
    </div>

  );
    
}

export default STLUploadForm;