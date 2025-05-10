import React, { useState } from 'react';
import './Clientes.css';
import { FaUser, FaPhone, FaMapMarkerAlt, FaPlus, FaEdit } from 'react-icons/fa';
import Notification from '../components/Notification';

function Clientes() {
  const [cliente, setCliente] = useState({
    nombre: '',
    telefono: '',
    direccion: ''
  });
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/backend/clientes.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      const data = await response.json();
      if (data.success) {
        showNotification("Cliente registrado exitosamente", "success");
        setCliente({
          nombre: '',
          telefono: '',
          direccion: ''
        });
      } else {
        showNotification(data.mensaje || "Error al registrar el cliente", "error");
      }
    } catch (error) {
      showNotification("Error al conectar con el servidor", "error");
    }
  };

  return (
    <div className="clientes-container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="clientes-box">
        <h1>Gestión de Clientes</h1>
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
              value={cliente.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">
              <FaPhone className="input-icon" />
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={cliente.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="direccion">
              <FaMapMarkerAlt className="input-icon" />
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={cliente.direccion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="action-button">
              <FaPlus className="button-icon" />
              Agregar Cliente
            </button>
            <button type="button" className="action-button edit">
              <FaEdit className="button-icon" />
              Modificar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Clientes; 