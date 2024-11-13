using MySql.Data.MySqlClient;
using System;

namespace ESE.Hospital
{
    public class MiServicio
    {
        // Cadena de conexión a la base de datos
        private readonly string _conexionString = "Server=localhost;Database=ese_hospital_san_jorge;User ID=root;Password=ESE_hospital_2024;";

        // Método para actualizar los datos del paciente
        public string ActualizarPaciente(string tipoId, string numId, string direccion, string celular)
        {
            try
            {
                using (var conexion = new MySqlConnection(_conexionString))
                {
                    conexion.Open();  // Asegúrate de abrir la conexión antes de ejecutar cualquier consulta

                    // Paso 1: Verificar si el paciente existe
                    string consultaExistente = "SELECT COUNT(*) FROM pacientes WHERE Tipo_Id = @TipoId AND NUM_ID = @NumId;";
                    using (var comandoExistente = new MySqlCommand(consultaExistente, conexion))
                    {
                        comandoExistente.Parameters.AddWithValue("@TipoId", tipoId);
                        comandoExistente.Parameters.AddWithValue("@NumId", numId);

                        int cantidadPacientes = Convert.ToInt32(comandoExistente.ExecuteScalar());

                        // Si el paciente existe, actualizamos la dirección y celular
                        if (cantidadPacientes > 0)
                        {
                            string consultaUpdate = @"
                                UPDATE pacientes 
                                SET barrio = @Direccion, celular = @Celular
                                WHERE Tipo_Id = @TipoId AND NUM_ID = @NumId;";

                            using (var comandoUpdate = new MySqlCommand(consultaUpdate, conexion))
                            {
                                comandoUpdate.Parameters.AddWithValue("@Direccion", direccion);
                                comandoUpdate.Parameters.AddWithValue("@Celular", celular);
                                comandoUpdate.Parameters.AddWithValue("@TipoId", tipoId);
                                comandoUpdate.Parameters.AddWithValue("@NumId", numId);

                                int filasAfectadas = comandoUpdate.ExecuteNonQuery();

                                // Si se actualizó correctamente, obtenemos el nombre y apellido del paciente
                                if (filasAfectadas > 0)
                                {
                                    string consultaNombreApellido = "SELECT NOMBRE_1, APELLIDO_1 FROM pacientes WHERE Tipo_Id = @TipoId AND NUM_ID = @NumId;";
                                    using (var comandoNombreApellido = new MySqlCommand(consultaNombreApellido, conexion))
                                    {
                                        comandoNombreApellido.Parameters.AddWithValue("@TipoId", tipoId);
                                        comandoNombreApellido.Parameters.AddWithValue("@NumId", numId);

                                        using (var reader = comandoNombreApellido.ExecuteReader())
                                        {
                                            if (reader.Read())
                                            {
                                                string nombre1 = reader.GetString("NOMBRE_1");
                                                string apellido1 = reader.GetString("APELLIDO_1");
                                                string ver ="vista";
                                                return $" {nombre1} {apellido1} {ver} ";  // Devolvemos el RUNT: número, nombre y apellido
                                            }
                                            else
                                            {
                                                return "Error al obtener los datos del paciente.";
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    return "No se realizaron cambios en los datos del paciente.";
                                }
                            }
                        }
                        else
                        {
                            return "El paciente no existe en la base de datos.";
                        }
                    }
                }
            }
            catch (MySqlException ex)
            {
                // En caso de error con MySQL
                return $"Error al actualizar paciente: {ex.Message}";
            }
            catch (Exception ex)
            {
                // En caso de otro error
                return $"Error al procesar la solicitud: {ex.Message}";
            }
        }

        // Método para verificar si la conexión funciona
        public string VerificarConexion()
        {
            try
            {
                using (var conexion = new MySqlConnection(_conexionString))
                {
                    conexion.Open(); // Intentar abrir la conexión

                    // Si la conexión fue exitosa
                    return "Conexión exitosa a la base de datos.";
                }
            }
            catch (MySqlException ex)
            {
                // Si no se puede conectar a la base de datos
                return $"Error de conexión: {ex.Message}";
            }
            catch (Exception ex)
            {
                // En caso de otro error
                return $"Error al verificar la conexión: {ex.Message}";
            }
        }
    }
}
