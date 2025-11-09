  
import React from 'react';

import supabase from '../SupaBaseClient';

function STLUploadForm({ filename }) {

  const fileInputRef = React.useRef();

    const [botTrap, setBotTrap] = React.useState(''); // honeypot field

  const [exampleFilename, setExampleFile] = React.useState(filename || null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [material, setMaterial] = React.useState('PLA');
  const [color, setColor] = React.useState('BLACK');
  const [uploadedFilename, setUploadedFilename] = React.useState('');
  const [fileBase64, setFileBase64] = React.useState('');
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);


  const transformFileToBase64 = (file) => {
     const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          setFileBase64(base64String);
        };
        reader.readAsDataURL(file);
  }

  const handleFileChange = (event) => {
    setSuccess(null);
    setError(null);
    const file = event.target.files[0];
    if (!file) return;

    setUploadedFilename(file.name);
    transformFileToBase64(file);
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
       
        transformFileToBase64(blob);
      } catch (err) {
        // Could not fetch file
        console.error('Could not fetch STL file:', err);
      }
    }
    fetchFileContent();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Om ingen fil är vald, visa bekräftelsedialog
    if (!uploadedFilename && !exampleFilename) {
      const confirmSend = window.confirm(
        'Du har inte valt någon 3D-modell att ladda upp. Vill du skicka formuläret ändå?'
      );
      if (!confirmSend) {
        setError('Formuläret ej skickat.');
        return;
      } 
    }

    handleFile();

    if (botTrap) {
      console.warn('Bot detected — submission blocked.');
      return;
    }

    const payload = {
      name: name,
      email: email,
      description: message,
      material: material,
      color: color,
      fileName: exampleFilename ?? uploadedFilename,
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
      if (uploadedFilename){
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div>
      <h3 style={{display: 'flex', alignItems: 'center', gap: 'var(--space-8)'}}>
        Kontakta oss på UtskriftsLabbet!
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
        <label className="form-label" htmlFor="name">Namn *</label>
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
        <label className="form-label" htmlFor="email">E-post *</label>
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
        <label className="form-label" htmlFor="message">Meddelande / Beskrivning</label>
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
        <label className="form-label" htmlFor="material">Material</label>
        <select 
          id="material"
          className="form-control"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        >
          <option value="PLA">PLA</option>
          <option value="PETG">PETG</option>
          <option value="TPU">TPU</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="color">Färg</label>
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
          <option value="Transparent">Transparent</option>
        </select>
      </div>


      {exampleFilename ? (
        <div className="form-group">
          <label className="form-label">3D-model:</label>
          <div className="form-control" style={{ display: 'flex', alignItems: 'center', background: '#f5f5f5', color: '#333', cursor: 'not-allowed', justifyContent: 'space-between' }}>
            <span>
              Fil vald: <strong>{exampleFilename}</strong>
            </span>
            <button
              type="button"
              style={{ marginLeft: '16px', background: '#eee', border: '1px solid #ccc', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}
              onClick={() => {
                setExampleFile(null);
                setFileBase64('');
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              aria-label="Rensa vald fil"
            >
              Rensa
            </button>
          </div>
        </div>
      ) : (
        <div className="form-group">
          <label className="form-label" htmlFor="stlFile">3D-model:</label>
          <input 
            ref={fileInputRef}
            id="stlFile"
            className="form-control"
            type="file" 
            accept=".stl,.obj,.3mf,.step,.stp,.svg,.amf"
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

  <button type="submit" disabled={false}>Skicka</button>
    </form>
    </div>

  );
    
}

export default STLUploadForm;