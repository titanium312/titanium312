using Microsoft.AspNetCore.Mvc;
using ESE.Hospital;
using System;

namespace ESE.Hospital
{
    [Route("api/[controller]")]
    [ApiController]
    public class EjecutorController : ControllerBase
    {
        private readonly MiServicio _conexionMySQL;

        // Constructor para inyectar ConexionMySQL
        public EjecutorController(MiServicio conexionMySQL)
        {
            _conexionMySQL = conexionMySQL;
        }

        // Acción para verificar la conexión a la base de datos
        [HttpGet("verificar-conexion")]
        public ActionResult<string> VerificarConexion()
        {
            try
            {
                var resultado = _conexionMySQL.VerificarConexion();
                return Ok(new { mensaje = resultado }); // Envolver el mensaje en un objeto JSON
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error: " + ex.Message }); // Envolver el mensaje de error en un objeto JSON
            }
        }

     // Acción para actualizar los datos del paciente

[HttpPost("ActualizarPaciente")]
public ActionResult ActualizarPaciente([FromBody] Paciente paciente)
{
    if (paciente == null || 
        string.IsNullOrWhiteSpace(paciente.TipoId) || 
        string.IsNullOrWhiteSpace(paciente.NumId) || 
        string.IsNullOrWhiteSpace(paciente.Direccion) || 
        string.IsNullOrWhiteSpace(paciente.Celular))
    {
        return BadRequest(new { mensaje = "Los datos del paciente son inválidos. Asegúrese de que todos los campos estén completos.baken" });
    }

    // Validación adicional (por ejemplo, verificar si el número de documento y celular son válidos)
    if (!long.TryParse(paciente.NumId, out _) || !long.TryParse(paciente.Celular, out _))
    {
        return BadRequest(new { mensaje = "El número de documento y celular deben ser valores numéricos válidos. baken" });
    }

    // Verificar si los datos están llegando correctamente
    Console.WriteLine($"TipoId: {paciente.TipoId}, NumId: {paciente.NumId}, Direccion: {paciente.Direccion}, Celular: {paciente.Celular}");

    try
    {
        var resultado = _conexionMySQL.ActualizarPaciente(paciente.TipoId, paciente.NumId, paciente.Direccion, paciente.Celular);

        // En caso de que el resultado sea positivo, lo devolvemos en el objeto de respuesta
        return Ok(new { mensaje = resultado });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { mensaje = "baken.Error al actualizar paciente: " + ex.Message});
    }
}


    }

    // Modelo para el paciente
    public class Paciente
    {
        public string TipoId { get; set; }
        public string NumId { get; set; }
        public string Direccion { get; set; }
        public string Celular { get; set; }
    }
}
