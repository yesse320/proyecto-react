import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import './Dashboard.css';
import logo from '../assets/Imagen2.jpg';
import { FaHome, FaBox, FaUsers, FaExchangeAlt, FaSignOutAlt, FaShoppingCart, FaWarehouse } from 'react-icons/fa';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // lógica para cerrar sesión
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" />
          <h2>Tech Development</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link 
                to="/dashboard" 
                className={isActive('/dashboard') ? 'active' : ''}
              >
                <FaHome className="icon" />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/productos" 
                className={isActive('/dashboard/productos') ? 'active' : ''}
              >
                <FaBox className="icon" />
                <span>Productos</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/stock" 
                className={isActive('/dashboard/stock') ? 'active' : ''}
              >
                <FaWarehouse className="icon" />
                <span>Stock</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/ventas" 
                className={isActive('/dashboard/ventas') ? 'active' : ''}
              >
                <FaShoppingCart className="icon" />
                <span>Ventas</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/clientes" 
                className={isActive('/dashboard/clientes') ? 'active' : ''}
              >
                <FaUsers className="icon" />
                <span>Clientes</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/devoluciones" 
                className={isActive('/dashboard/devoluciones') ? 'active' : ''}
              >
                <FaExchangeAlt className="icon" />
                <span>Devoluciones</span>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                <FaSignOutAlt className="icon" />
                <span>Cerrar Sesión</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard; 