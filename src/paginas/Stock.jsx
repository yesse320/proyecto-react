import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Notification from '../components/Notification';
import './Stock.css';

function Stock() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost/backend/productos.php');
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            
            const data = await response.json();
            
            if (data.success && Array.isArray(data.data)) {
                setProductos(data.data);
            } else {
                throw new Error('Formato de datos incorrecto');
            }
        } catch (error) {
            console.error('Error al cargar productos:', error);
            setNotification({
                message: `Error al cargar los productos: ${error.message}`,
                type: 'error'
            });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="stock-container">
            {notification.message && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ message: '', type: '' })}
                />
            )}
            <div className="stock-box">
                <div className="header-container">
                    <button 
                        className="back-button"
                        onClick={() => navigate('/dashboard')}
                    >
                        <FaArrowLeft />
                    </button>
                    <h1>Control de Stock</h1>
                </div>

                <div className="table-container">
                    <table className="stock-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Fecha de Creación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.length > 0 ? (
                                productos.map(producto => (
                                    <tr key={producto.id}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.descripcion}</td>
                                        <td>${producto.precio.toFixed(2)}</td>
                                        <td className={producto.cantidad < 10 ? 'stock-bajo' : ''}>
                                            {producto.cantidad}
                                        </td>
                                        <td>{formatDate(producto.fecha_creacion)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                        No hay productos registrados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Stock; 