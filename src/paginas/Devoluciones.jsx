import React, { useState } from 'react';
import { FaCalendarAlt, FaIdCard, FaUser, FaFileAlt, FaSave, FaTimes } from 'react-icons/fa';
import './Devoluciones.css';
import Notification from '../components/Notification';

function Devoluciones() {
  const [devolucion, setDevolucion] = useState({
    fecha: '',
    id: '',
    nombre: '',
    descripcion: ''
  });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDevolucion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que todos los campos estén llenos
    if (!devolucion.fecha || !devolucion.id || !devolucion.nombre || !devolucion.descripcion) {
      setNotification({
        type: 'error',
        message: 'Por favor complete todos los campos'
      });
      return;
    }

    try {
      const response = await fetch('http://localhost/backend/devoluciones.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(devolucion)
      });

      const data = await response.json();

      if (data.success) {
        setNotification({
          type: 'success',
          message: 'Devolución registrada exitosamente'
        });
        // Limpiar el formulario
        setDevolucion({
          fecha: '',
          id: '',
          nombre: '',
          descripcion: ''
        });
      } else {
        setNotification({
          type: 'error',
          message: data.message || 'Error al registrar la devolución'
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Error de conexión con el servidor'
      });
    }
  };

  const handleCancel = () => {
    setDevolucion({
      fecha: '',
      id: '',
      nombre: '',
      descripcion: ''
    });
    setNotification({
      type: 'info',
      message: 'Operación cancelada'
    });
  };

  return (
    <div className="devoluciones-container">
      <div className="devoluciones-box">
        <h1>Registro de Devoluciones</h1>
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <FaCalendarAlt className="input-icon" />
              Fecha
            </label>
            <input
              type="date"
              name="fecha"
              value={devolucion.fecha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaIdCard className="input-icon" />
              ID
            </label>
            <input
              type="text"
              name="id"
              value={devolucion.id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaUser className="input-icon" />
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={devolucion.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaFileAlt className="input-icon" />
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={devolucion.descripcion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="action-button">
              <FaSave className="button-icon" />
              Guardar
            </button>
            <button type="button" className="action-button cancel" onClick={handleCancel}>
              <FaTimes className="button-icon" />
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Devoluciones; 