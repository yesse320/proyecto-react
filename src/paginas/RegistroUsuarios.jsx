import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaStore, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Notification from '../components/Notification';
import logo from '../assets/Imagen2.jpg';
import "./RegistroUsuarios.css";

function RegistroUsuarios() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    celular: "",
    tipoProveedor: "",
    contrasena: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.celular || 
        !formData.tipoProveedor || !formData.contrasena) {
      showNotification("Todos los campos son obligatorios", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost/backend/usuarios_nuevos.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        showNotification("Usuario registrado exitosamente", "success");
        setFormData({
          nombre: "",
          correo: "",
          celular: "",
          tipoProveedor: "",
          contrasena: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        showNotification(data.mensaje || "Error al registrar usuario", "error");
      }
    } catch (error) {
      showNotification("Error al conectar con el servidor", "error");
    }
  };

  return (
    <div className="register-container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="register-box">
        <div className="register-header">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Tech Development</h1>
          <h2>Registro de Usuarios</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">
              <FaUser className="input-icon" />
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">
              <FaEnvelope className="input-icon" />
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="celular">
              <FaPhone className="input-icon" />
              Celular
            </label>
            <input
              type="tel"
              id="celular"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipoProveedor">
              <FaStore className="input-icon" />
              Tipo de Proveedor
            </label>
            <select
              id="tipoProveedor"
              name="tipoProveedor"
              value={formData.tipoProveedor}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="proveedor">Proveedor</option>
              <option value="cliente">Cliente</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">
              <FaLock className="input-icon" />
              Contraseña
            </label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="contrasena"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="register-button">
            Registrarse
          </button>
        </form>

        <div className="register-links">
          <a href="/login">¿Ya tienes una cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}

export default RegistroUsuarios;
