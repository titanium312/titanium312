using ESE.Hospital;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Agregar servicios para los controladores
builder.Services.AddControllers();

// Registrar MiServicio para inyección de dependencias
builder.Services.AddSingleton<MiServicio>();  // Usamos Singleton para esta prueba

// Configurar CORS para permitir solicitudes desde cualquier origen
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        // Permite solicitudes desde cualquier origen
        policy.AllowAnyOrigin()            // Permite cualquier origen
              .AllowAnyMethod()            // Permite cualquier método (GET, POST, PUT, DELETE, etc.)
              .AllowAnyHeader();           // Permite cualquier encabezado
    });
});

var app = builder.Build();

// Configurar el middleware de CORS con la política "AllowAllOrigins" para permitir cualquier origen
app.UseCors("AllowAllOrigins");  // Usamos la política AllowAllOrigins para permitir solicitudes desde cualquier origen

// Configurar las rutas de los controladores
app.MapControllers();

// Ejecutar la aplicación
app.Run();
