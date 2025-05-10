import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="welcome-message">
      <h1>¡Bienvenido al Sistema de Gestión de inventario!</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Productos</h3>
          <p>Gestiona tu inventario</p>
          <Link to="/dashboard/productos" className="action-button">Ver Productos</Link>
        </div>
        <div className="stat-card">
          <h3>Clientes</h3>
          <p>Administra tus clientes</p>
          <Link to="/dashboard/clientes" className="action-button">Ver Clientes</Link>
          </div>
          <div className="stat-card">
            <h3>Ventas</h3>
            <p>Administra tus ventas</p>
            <Link to="/dashboard/ventas" className="action-button">Ver ventas</Link>
        </div>
        <div className="stat-card">
          <h3>Devoluciones</h3>
          <p>Controla las devoluciones</p>
          <Link to="/dashboard/devoluciones" className="action-button">Ver Devoluciones</Link>
        </div>
      </div>
    </div>
  );
}

export default Home; 