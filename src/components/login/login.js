import { useState } from 'react';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Usuario:', usuario);
    console.log('Contraseña:', contrasena);
    alert(`Bienvenido, ${usuario}`);
  };

  return (
    <div>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={manejarEnvio}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
