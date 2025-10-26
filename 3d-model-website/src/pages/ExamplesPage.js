import { useState } from 'react';
import { Link } from '../App';

import {StlViewer} from "react-stl-viewer";

const url3 = "part1.stl"
const url4 = "part1.stl"

const style = {
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
}

// Examples page component
function ExamplesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);

  const exampleBoxes = [
    { title: 'Example 1', url: url3, name: 'Model Name 1', price: 'Price 1', filename: url3 },
    { title: 'Example 2', url: url3, name: 'Model Name 2', price: 'Price 2', filename: url3 },
    { title: 'Example 3', url: url4, name: 'Model Name 3', price: 'Price 3', filename: url4 },
    { title: 'Example 4', url: url4, name: 'Model Name 4', price: 'Price 4', filename: url4 },
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
        <p>Utforska riktiga 3D-modeller med vår professionella STL-visare (react-stl-viewer). Interagera med utskriftsfärdiga filer och få pris direkt.</p>
      </section>

      <section>
        <h2 style={{marginBottom: '24px'}}>Fler exempel</h2>
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
              <div style={{marginTop: 4, fontWeight: 500}}>
                Pris: <span style={{color: '#059669'}}>{ex.price}</span>
              </div>
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
        <p>Ladda upp dina STL-filer och få pris direkt med vår professionella visare. Vi stödjer alla större 3D-filformat och ger prisuppskattning i realtid.</p>
        <div style={{display: 'flex', gap: 'var(--space-16)', marginTop: '16px', flexWrap: 'wrap'}}>
          <Link to="/contact" className="btn btn--primary">Få offert</Link>
          <Link to="/information" className="btn btn--outline">Läs mer</Link>
        </div>
      </section>

      <section className="card" style={{marginTop: '32px'}}>
        <h2>Fler exempel från Maker World</h2>
        <p>Här är andra exempel som vi kan skriva ut:</p>
        <a href="https://www.makerworld.com/" target="_blank" rel="noopener noreferrer" className="btn btn--outline">Besök Maker World</a>
      </section>
    </div>
  );
}

export default ExamplesPage;