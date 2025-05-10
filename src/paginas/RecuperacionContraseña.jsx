import React, { useState } from 'react';

const RecuperarContrasena = () => {
  const [email, setEmail] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevaContrasena !== confirmarContrasena) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }
    const bodyData = {
      correo: email,
      nuevaContrasena: nuevaContrasena,
    };
    try {
      const response = await fetch("http://localhost/backend/recuperar_contrasena.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: email,
          nuevaContrasena: nuevaContrasena,
        }),
      });

      const data = await response.json();
      setMensaje(data.mensaje);
    } catch (error) {
      console.error("Error:", error);
      setMensaje("No se pudo conectar con el servidor");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2 style={{ color: 'white', backgroundColor: '#2c6a83', padding: '10px 20px', borderRadius: '8px', fontSize: '20px' }}>
        Cambiar Contraseña - Tech Development
      </h2>

      <form onSubmit={handleSubmit} style={{ width: '400px', padding: '20px', borderRadius: '10px', marginTop: '10px', backgroundColor: 'rgb(97, 138, 185)' }}>
        {mensaje && (
          <p style={{ backgroundColor: 'white', padding: '10px', borderRadius: '6px', marginBottom: '15px', textAlign: 'center' }}>
            {mensaje}
          </p>
        )}

        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Nueva Contraseña:</label>
          <div style={{ display: 'flex' }}>
            <input
              type={mostrarNueva ? "text" : "password"}
              placeholder="Nueva contraseña"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              required
              style={{ flex: 1, padding: '8px' }}
            />
            <button
              type="button"
              onClick={() => setMostrarNueva(!mostrarNueva)}
              style={{ marginLeft: '5px' }}
            >
              {mostrarNueva ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Confirmar Contraseña:</label>
          <div style={{ display: 'flex' }}>
            <input
              type={mostrarConfirmacion ? "text" : "password"}
              placeholder="Confirmar contraseña"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              required
              style={{ flex: 1, padding: '8px' }}
            />
            <button
              type="button"
              onClick={() => setMostrarConfirmacion(!mostrarConfirmacion)}
              style={{ marginLeft: '5px' }}
            >
              {mostrarConfirmacion ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#2c6a83', color: 'white', border: 'none' }}
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

export default RecuperarContrasena;
