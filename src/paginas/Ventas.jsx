import React, { useState } from 'react';
import './Ventas.css';
import { FaUser, FaBox, FaDollarSign, FaPlus, FaMinus } from 'react-icons/fa';
import Notification from '../components/Notification';

function Ventas() {
  const [venta, setVenta] = useState({
    cliente: '',
    id: '',
    producto: '',
    cantidad: '',
    precio: ''
  });
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenta(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/backend/ventas.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(venta),
      });

      const data = await response.json();
      if (data.success) {
        showNotification("Venta registrada exitosamente", "success");
        setVenta({
          cliente: '',
          id: '',
          producto: '',
          cantidad: '',
          precio: ''
        });
      } else {
        showNotification(data.mensaje || "Error al registrar la venta", "error");
      }
    } catch (error) {
      showNotification("Error al conectar con el servidor", "error");
    }
  };

  return (
    <div className="ventas-container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="ventas-box">
        <h1>Registro de Ventas</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cliente">
              <FaUser className="input-icon" />
              Cliente
            </label>
            <input
              type="text"
              id="cliente"
              name="cliente"
              value={venta.cliente}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="id">
              <FaBox className="input-icon" />
              ID
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={venta.id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="producto">
              <FaBox className="input-icon" />
              Producto
            </label>
            <input
              type="text"
              id="producto"
              name="producto"
              value={venta.producto}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cantidad">
              <FaPlus className="input-icon" />
              Cantidad
            </label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              value={venta.cantidad}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="precio">
              <FaDollarSign className="input-icon" />
              Precio
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={venta.precio}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="venta-button">
            Registrar Venta
          </button>
        </form>
      </div>
    </div>
  );
}

export default Ventas; 