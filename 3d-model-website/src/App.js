import React, { useState, useEffect } from 'react';
import ContactPage from './pages/ContactPage';
import InformationPage from './pages/InformationPage';
import ExamplesPage from './pages/ExamplesPage';
import HomePage from './pages/HomePage';

// Simple Router implementation
function Router({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return React.cloneElement(children, { currentPath, navigate });
}

// Route component
function Route({ path, element, currentPath }) {
  return currentPath === path ? element : null;
}

// Link component
function Link({ to, children, className, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
    if (onClick) onClick();
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export { Link };

// NavLink component
function NavLink({ to, children, className, onClick, currentPath }) {
  const isActive = currentPath === to;
  const finalClassName = typeof className === 'function' 
    ? className({ isActive }) 
    : `${className} ${isActive ? 'active' : ''}`;

  return (
    <Link to={to} className={finalClassName} onClick={onClick}>
      {children}
    </Link>
  );
}

// Header component
function Header({ currentPath, navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Hem' },
    { path: '/information', label: 'Information' },
    { path: '/examples', label: 'Exempel' },
    { path: '/contact', label: 'Kontakt' }
  ];

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          PrintARN
        </Link>
        
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={`nav-link`}
                currentPath={currentPath}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="mobile-menu"
          aria-label="Open menu"
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </nav>

      <div id="mobile-navigation" className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`nav-link`}
            currentPath={currentPath}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="footer">
      <div className="nav">
        <p>&copy; 2025 printARN.</p>
      </div>
    </footer>
  );
}

// Home page component



// Main App component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent({ currentPath, navigate }) {
  return (
    <div className="app">
      <Header currentPath={currentPath} navigate={navigate} />
      <main className="main">
        <Route path="/" element={<HomePage />} currentPath={currentPath} />
        <Route path="/information" element={<InformationPage />} currentPath={currentPath} />
        <Route path="/examples" element={<ExamplesPage />} currentPath={currentPath} />
        <Route path="/contact" element={<ContactPage />} currentPath={currentPath} />
      </main>
      <Footer />
    </div>
  );
}

export default App;