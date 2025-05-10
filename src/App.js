import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PantallaInicioSesion from "./paginas/PantallaInicioSesion";
import AgregarProducto from "./paginas/AgregarProducto";
import RegistroUsuarios from "./paginas/RegistroUsuarios";
import RecuperacionContraseña from "./paginas/RecuperacionContraseña";
import Dashboard from "./paginas/Dashboard";
import Clientes from "./paginas/Clientes";
import Devoluciones from "./paginas/Devoluciones";
import Ventas from "./paginas/Ventas";
import Home from "./paginas/Home";
import Stock from "./paginas/Stock";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<AgregarProducto />} />
            <Route path="stock" element={<Stock />} />
            <Route path="ventas" element={<Ventas />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="devoluciones" element={<Devoluciones />} />
          </Route>
          <Route path="/login" element={<PantallaInicioSesion />} />
          <Route path="/registro" element={<RegistroUsuarios />} />
          <Route path="/recuperar" element={<RecuperacionContraseña />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

