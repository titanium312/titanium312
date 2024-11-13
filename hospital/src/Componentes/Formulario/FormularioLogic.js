// FormularioLogic.js

// Maneja el cambio en el campo de número de documento
export const handleNumeroDocumentoChange = (e, setNumeroDocumento) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
        setNumeroDocumento(value); // Solo números
    }
};

// Maneja el cambio en el campo de número de celular
export const handleNumeroCelularChange = (e, setNumeroCelular) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
        setNumeroCelular(value); // Solo números
    }
};

// Función que se ejecuta cuando el usuario pega un valor en el input
export const handlePaste = (e, setInputValue) => {
    e.preventDefault();  // Previene el comportamiento por defecto
    const pastedValue = e.clipboardData.getData('text');
    const filteredValue = pastedValue.replace(/\D/g, ''); // Remueve caracteres no numéricos
    setInputValue(filteredValue);
};

// Actualiza los datos del paciente
export const actualizarPaciente = async (requestData, setPaciente, setMensaje, setMensajeTipo, setVista) => {
    try {
        const response = await fetch('http://localhost:5090/api/ejecutor/ActualizarPaciente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();

        if (response.ok) {
            setPaciente(data);  // Guardar los datos del paciente en el estado
            
            // Desglosar el mensaje recibido (suponiendo que es algo como "Juan Pérez activo")
            const partes = data.mensaje.split(' '); // Separar el mensaje en partes

            // Asignar los valores por separado
            const nombre = partes[0];
            const apellido = partes[1];
            const ver = partes[2]; // Esto sería el valor de 'ver'

            setMensaje(`Nombre: ${nombre}, Apellido: ${apellido}, Estado: ${ver}`);
            setMensajeTipo("success");
            setVista(data.vista); // Mostrar el modal si "vista" es true
        } else {
            setMensaje(data.mensaje || "Hubo un error al actualizar los datos.");
            setMensajeTipo("error");
            setPaciente(null);
            setVista(false); // Ocultar el modal si "vista" es false
        }
    } catch (error) {
        setMensaje("Error al realizar la solicitud: " + error.message);
        setMensajeTipo("error");
        setPaciente(null);

        // Aquí cambiamos `data.vista` por un valor predeterminado
        setVista(false); // Ocultar el modal en caso de error
    }
};
