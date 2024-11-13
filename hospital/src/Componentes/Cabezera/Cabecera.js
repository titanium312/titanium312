import React, { useState, useEffect } from 'react';
import './Cabecera.css';  // Importa el archivo CSS
import logo from './img/logo.png';

const Cabecera = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    const handleScroll = () => {
      // Detecta si se hizo scroll hacia abajo
      if (window.scrollY > 50) {
        setScrolled(true); // Cambia el estado a true si el scroll es mayor a 50px
      } else {
        setScrolled(false); // Si no, vuelve a su estado original
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Limpiar los event listeners cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`headerContainer ${scrolled ? 'scrolled' : ''}`}>
      <div className="siteBranding">
        <img src={logo} alt="Logo" className="siteLogo" />
        <h1 className="siteTitle">E.S.E. HOSPITAL SAN JORGE DE AYAPEL</h1>
      </div>

      {/* Botón de menú para pantallas pequeñas */}
      {isMobile && (
        <div className="btnMenu" onClick={toggleMenu}>
          <i className="fa fa-bars"></i>
        </div>
      )}

      {/* Menú de navegación */}
      <nav className={`navMenu ${isMenuOpen ? "activeNavMenu" : ""}`}>
        <ul className="navMenuList">
          <li className="navMenuItem"><a href="#home" className="navMenuLink">Inicio</a></li>
          <li className="navMenuItem"><a href="#about" className="navMenuLink">Sobre Mí</a></li>
          <li className="navMenuItem"><a href="#services" className="navMenuLink">Servicios</a></li>
          <li className="navMenuItem"><a href="#contact" className="navMenuLink">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Cabecera;
