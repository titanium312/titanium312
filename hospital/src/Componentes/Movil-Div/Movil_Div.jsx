import React, { useState, useEffect, useRef } from 'react';
import './css.css'; // Asegúrate de tener las imágenes en la carpeta de tu proyecto

const Movil_Div = () => {
  const [seccionActual, setSeccionActual] = useState(1); // Estado para la sección actual

  // Ref para almacenar el identificador del intervalo
  const intervaloRef = useRef(null);

  // Lista de secciones con identificador y la URL de la imagen
  const secciones = [
    { id: 'seccion1', image: 'url(https://tusaludplus.com/wp-content/uploads/2021/09/tusaludlogo-01.png)' },
    { id: 'seccion2', image: 'url(https://gsnoticias.com/wp-content/uploads/2023/05/ayapel.png)' },
    { id: 'seccion3', image: 'url(https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' },
    { id: 'seccion4', image: 'url(https://images.unsplash.com/photo-1542396601-dca920ea2807?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' },
    { id: 'seccion5', image: 'url(https://www.laregional.net/wp-content/uploads/2023/07/hospital-ayapel.jpg)' },
  ];

  // Función para iniciar el contador de la sección
  const iniciarContador = () => {
    // Limpiar cualquier intervalo previo
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }
    // Iniciar un nuevo intervalo
    intervaloRef.current = setInterval(() => {
      setSeccionActual((prev) => (prev % secciones.length) + 1);
    }, 3000);
  };

  // Efecto para iniciar el contador de la sección
  useEffect(() => {
    iniciarContador(); // Iniciar el contador al cargar el componente

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervaloRef.current);
  }, []);

  // Función para ir a la siguiente sección
  const siguienteSeccion = () => {
    setSeccionActual((prev) => (prev % secciones.length) + 1);
    iniciarContador(); // Reiniciar el contador al cambiar de sección
  };

  // Función para ir a la sección anterior
  const anteriorSeccion = () => {
    setSeccionActual((prev) => (prev === 1 ? secciones.length : prev - 1));
    iniciarContador(); // Reiniciar el contador al cambiar de sección
  };

  return (
    <div className="container">
      {/* Puntos de navegación dentro del contenedor */}
      <div className="index">
        {secciones.map((_, indice) => (
          <div
            key={indice}
            className={`dot ${seccionActual === indice + 1 ? 'active' : ''}`}
            onClick={() => {
              setSeccionActual(indice + 1); // Cambiar sección al hacer clic
              iniciarContador(); // Reiniciar el contador al cambiar de sección
            }}
          />
        ))}
      </div>

      {/* Contenedor de las secciones */}
      <div className="sections">
        {secciones.map((seccion, indice) => (
          <div
            key={seccion.id}
            className={`section ${seccionActual === indice + 1 ? 'active' : ''}`}
            style={{
              backgroundImage: seccion.image, // Imagen de fondo
            }}
          />
        ))}
      </div>

      {/* Flechas de navegación dentro del contenedor */}
      <div className="flecha izquierda" onClick={anteriorSeccion}>❮</div>
      <div className="flecha derecha" onClick={siguienteSeccion}>❯</div>
    </div>
  );
};

export default Movil_Div;
