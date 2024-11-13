import React, { useState } from 'react';
import './estilos.css';
import {
    handleNumeroDocumentoChange,
    handleNumeroCelularChange,
    handlePaste,
    actualizarPaciente
} from './FormularioLogic';

const Formulario = () => {
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [numeroCelular, setNumeroCelular] = useState('');
    const [direccion, setDireccion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [mensajeTipo, setMensajeTipo] = useState(''); // Para controlar el tipo de mensaje (success/error)
    const [vista, setVista] = useState(false); // Estado para mostrar el modal
    const [paciente, setPaciente] = useState(null); // Estado para almacenar los datos del paciente actualizado

    // Función que se ejecuta cuando se actualiza el paciente
    const handleActualizarPaciente = async (e) => {
        e.preventDefault();

        const requestData = {
            TipoId: tipoDocumento,
            NumId: numeroDocumento,
            Direccion: direccion,  // Asumiendo que la dirección es el nuevo barrio
            Celular: numeroCelular,
        };

        // Llamada a la lógica de actualización
        actualizarPaciente(requestData, setPaciente, setMensaje, setMensajeTipo, setVista);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setVista(false);
    };

    // Función para separar el mensaje en sus partes (nombre, apellido, estado)
    const separarMensaje = (mensaje) => {
        // Suponiendo que el mensaje es una cadena con nombre, apellido, y estado
        // Ejemplo de mensaje: "Juan Pérez activo"
        const partes = mensaje.split(' ');
        
        // Aseguramos que el mensaje tiene suficientes partes, de lo contrario los valores estarán vacíos
        return {
            nombre: partes[0] || 'Nombre no disponible', // Primer palabra (nombre)
            apellido: partes[1] || 'Apellido no disponible', // Segunda palabra (apellido)
            estado: partes[2] || 'Estado no disponible', // Tercera palabra (estado)
        };
    };

    // Extraemos los valores del mensaje separado
    const { nombre, apellido, estado } = separarMensaje(mensaje);

    return (
        <div className="formulario-container">
            <form onSubmit={handleActualizarPaciente} className="formulario">
                <h2>Formulario de Registro</h2>

                <label htmlFor="tipo-documento">Tipo de Documento:</label>
                <select
                    id="tipo-documento"
                    value={tipoDocumento}
                    onChange={(e) => setTipoDocumento(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Selecciona un tipo de documento
                    </option>
                    <option value="CC">Cédula</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="RC">Registro Civil</option>
                </select>

                <label htmlFor="numero-documento">Número de Documento:</label>
                <input
                    type="text"
                    id="numero-documento"
                    value={numeroDocumento}
                    onChange={(e) => handleNumeroDocumentoChange(e, setNumeroDocumento)}
                    onPaste={(e) => handlePaste(e, setNumeroDocumento)}
                    required
                    maxLength="20"
                    pattern="\d*"
                    title="El número de documento solo debe contener números"
                />

                <label htmlFor="numero-celular">Número Celular:</label>
                <input
                    type="tel"
                    id="numero-celular"
                    value={numeroCelular}
                    onChange={(e) => handleNumeroCelularChange(e, setNumeroCelular)}
                    onPaste={(e) => handlePaste(e, setNumeroCelular)}
                    required
                    maxLength="15"
                    pattern="\d*"
                    title="El número de celular solo debe contener números"
                />

                <label htmlFor="direccion">Dirección:</label>
                <input
                    type="text"
                    id="direccion"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                />

                <button type="submit">Enviar</button>

                {/* Mostrar mensaje de éxito o error */}
                <div className={`alerta ${mensajeTipo}`}>
                    {mensaje}
                </div>
            </form>

            {/* Mostrar el modal solo si 'vista' es true */}
            {vista && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{mensajeTipo === 'success' ? '¡Actualización Exitosa!' : 'Error al Actualizar'}</h3>
                        <p><strong>Tipo de Documento:</strong> {tipoDocumento}</p>
                        <p><strong>Número de Documento:</strong> {numeroDocumento}</p>                                              
                        <p><strong>Nombre:</strong> {nombre}</p>
                        <p><strong>Apellido:</strong> {apellido}</p>
                        <p><strong>Estado:</strong> {estado}</p>

                        {/* Si hay un error, muestra el mensaje de error */}
                        {mensajeTipo === 'error' && (
                            <p><strong>Error:</strong> {mensaje}</p>
                        )}

                        {/* Botón para cerrar el modal */}
                        <button className="btn-cerrar" onClick={closeModal}>Ok</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Formulario;
