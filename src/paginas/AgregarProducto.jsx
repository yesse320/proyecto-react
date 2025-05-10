import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Notification from '../components/Notification';
import './AgregarProducto.css';

function AgregarProducto() {
    const navigate = useNavigate();
    const initialFormState = {
        nombre: '',
        descripcion: '',
        precio: '',
        cantidad: ''
    };
    const [formData, setFormData] = useState(initialFormState);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Convertir valores numéricos
            const precio = parseFloat(formData.precio) || 0;
            const cantidad = parseInt(formData.cantidad) || 0;

            if (isNaN(precio) || precio < 0) {
                throw new Error('El precio debe ser un número válido');
            }

            if (isNaN(cantidad) || cantidad < 0) {
                throw new Error('La cantidad debe ser un número válido');
            }

            const response = await fetch('http://localhost/backend/insertar_producto.php', { // Asegúrate de que esta URL esté correcta
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    descripcion: formData.descripcion,
                    precio: parseFloat(formData.precio),
                    cantidad: parseInt(formData.cantidad)  
                    
                })
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();

            if (data.success) {
                setNotification({
                    message: 'Producto agregado exitosamente',
                    type: 'success'
                });
                setFormData(initialFormState);
            } else {
                throw new Error(data.mensaje || 'Error al agregar el producto');
            }
        } catch (error) {
            setNotification({
                message: error.message,
                type: 'error'
            });
        }
    };

    return (
        <div className="agregar-producto-container">
            {notification.message && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ message: '', type: '' })}
                />
            )}
            <div className="agregar-producto-box">
                <div className="header-container">
                    <button 
                        className="back-button"
                        onClick={() => navigate('/dashboard')}
                    >
                        <FaArrowLeft />
                    </button>
                    <h1>Agregar Producto</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre del Producto</label>
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
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input
                            type="number"
                            id="precio"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cantidad">Cantidad</label>
                        <input
                            type="number"
                            id="cantidad"
                            name="cantidad"
                            value={formData.cantidad}
                            onChange={handleChange}
                            min="0"
                            required
                            placeholder="0"
                        />
                    </div>

                    <div className="button-group">
                        <button type="submit" className="btn-primary">
                            Agregar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AgregarProducto;
