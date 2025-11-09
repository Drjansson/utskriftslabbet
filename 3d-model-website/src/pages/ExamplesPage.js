import { useState } from 'react';
import { Link } from '../App';

import {StlViewer} from "react-stl-viewer";

// Examples page component
function ExamplesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);

  const url1 = "exampleModels/horlursstall-75mm.stl"
  const url2 = "exampleModels/filament_spool_holder_left.stl"
  const url3 = "exampleModels/part1.stl"
  const url4 = "exampleModels/part1.stl"
  const exampleBoxes = [
    { title: 'Hörlursställ', url: url1, name: 'Hörlurshållare till Ikea Skådis', price: '80 kr', 
      filename: 'horlursstall-75mm.stl', credit: 'MarcelBichon', creditUrl: 'https://makerworld.com/sv/models/157856-ikea-skadis-headphone-holder' },
    { title: 'Filamenthållare', url: url2, name: 'Filamenthållare till Ikea Skådis', price: '100 kr', 
      filename: 'filament_spool_holder_left.stl', credit: 'zoey', creditUrl: 'https://makerworld.com/sv/models/215953-filament-spool-holder-ikea-skadis' },
    { title: 'Example 3', url: url3, name: 'Model Name 3', price: null, 
      filename: url4, credit: 'utskriftslabbet', creditUrl: 'https://utskriftslabbet.se' },
    { title: 'Example 4', url: url4, name: 'Model Name 4', price: null, 
      filename: url4, credit: null, creditUrl: null },
  ];

  const openModal = (url) => {
    setModalUrl(url);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalUrl(null);
  };

  return (
    <div>

      <section className="hero">
        <h1>Exempel på 3D-modeller</h1>
        <p></p>
      </section>

      <section>
        <h2 style={{display: 'none', marginBottom: '24px'}}>Fler exempel</h2>
        {/* Två rader, två boxar per rad */}
        <div className="grid grid-2" style={{marginBottom: '32px'}}>
          {exampleBoxes.map((ex, i) => (
            <div className="card" key={i} style={{cursor: 'pointer', paddingBottom: 16}} onClick={() => openModal(ex.url)}>
              <h4>{ex.title}</h4>
              <div style={{height: 200}}>
                <StlViewer style={{width: '100%', height: '100%'}} orbitControls shadows url={ex.url} />
              </div>
              <div style={{fontSize: '0.9em', color: '#888', marginTop: 8}}>Klicka för att zooma</div>
              <div style={{marginTop: 12, fontWeight: 500}}>
                Namn: <span style={{color: '#2563eb'}}>{ex.name}</span>
              </div>
              {ex.price && (
                <div style={{marginTop: 4, fontWeight: 500}}>
                  Pris: <span style={{color: '#059669'}}>{ex.price}</span>
                </div>
              )}
              {ex.credit && ex.creditUrl && (
                <div style={{marginTop: 2, fontSize: '0.85em', color: '#888'}}>
                  Skapare: <a href={ex.creditUrl} target="_blank" rel="noopener noreferrer" style={{color: '#2563eb', textDecoration: 'underline'}}>{ex.credit}</a>
                </div>
              )}
              <Link
                to={`/contact?filename=${encodeURIComponent(ex.filename)}`}
                className="btn btn--primary"
                style={{marginTop: 12, display: 'inline-block'}}>
                Kontakta oss för att beställa denna modell
              </Link>
            </div>
          ))}

        </div>
      </section>

      {/* Modal för zoomad STLViewer */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 24,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              minWidth: 320,
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: '#eee',
                border: 'none',
                borderRadius: 6,
                padding: '6px 12px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >Stäng</button>
            <div style={{width: '60vw', height: '60vh', minWidth: 320, minHeight: 320}}>
              <StlViewer style={{width: '100%', height: '100%'}} orbitControls shadows url={modalUrl} />
            </div>
          </div>
        </div>
      )}

      <section className="card" style={{marginTop: '48px'}}>
        <h2>Redo att starta ditt projekt?</h2>
        <p>Ladda upp dina 3D-modeller. Vi stödjer alla större 3D-filformat.</p>
        <div style={{display: 'flex', gap: 'var(--space-16)', marginTop: '16px', flexWrap: 'wrap'}}>
          <Link to="/contact" className="btn btn--primary">Kontakta oss</Link>
          <Link to="/" className="btn btn--outline">Läs mer</Link>
        </div>
      </section>

      <section className="card" style={{marginTop: '32px'}}>
        <h2>Har du ingen egen 3D-modell?</h2>
        <p>På makerworld.com hittar du massor av 3D-modeller som vi kan skriva ut:</p>
        <a href="https://www.makerworld.com/" target="_blank" rel="noopener noreferrer" className="btn btn--primary">Besök Maker World</a>
      </section>
    </div>
  );
}

export default ExamplesPage;