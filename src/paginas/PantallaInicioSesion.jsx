import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PantallaInicioSesion.css";
import logo from '../assets/Imagen2.jpg';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserPlus, FaKey } from 'react-icons/fa';
import Notification from '../components/Notification';

function PantallaInicioSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        correo: email.trim(),
        contrasena: password.trim()
      };
      console.log('Sending data:', formData);

      const response = await fetch("http://localhost/backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(formData),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        showNotification('Error en la respuesta del servidor', 'error');
        return;
      }

      console.log('Parsed data:', data);

      if (data.success) {
        showNotification('Inicio de sesión exitoso', 'success');
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        showNotification(data.mensaje || 'Correo o contraseña incorrectos', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      showNotification('Error de conexión con el servidor', 'error');
    }
  };

  const handleOlvideContrasena = (e) => {
    e.preventDefault();
    navigate("/recuperar");
  };

  const handleNuevoUsuario = (e) => {
    e.preventDefault();
    navigate("/registro");
  };

  return (
    <div className="login-container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="login-box">
        <div className="login-header">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Tech Development</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="input-icon" />
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="input-icon" />
              Contraseña
            </label>
            <div className="password-container">
              <input
                type={mostrarPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setMostrarPassword(!mostrarPassword)}
              >
                {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
        <div className="login-links">
          <a href="/recuperar" onClick={handleOlvideContrasena}>
            <FaKey className="link-icon" />
            ¿Olvidaste tu contraseña?
          </a>
          <a href="/registro" onClick={handleNuevoUsuario}>
            <FaUserPlus className="link-icon" />
            Registrarse
          </a>
        </div>
      </div>
    </div>
  );
}

export default PantallaInicioSesion;
