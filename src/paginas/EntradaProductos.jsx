import { useState } from "react";
import './EntradaProductos.css';

function EntradaProductos() {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mensaje, setMensaje] = useState("");

  const registrarEntrada = async () => {
    if (!nombre || !cantidad) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch("http://localhost/Backend/entrada_productos.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, cantidad })
      });

      const data = await response.json();
      setMensaje(data.mensaje);

      if (data.success) {
        setNombre("");
        setCantidad("");
      }
    } catch (error) {
      console.error("Error al registrar entrada:", error);
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div className="fondo-general">
  <div className="formulario">
    <h2>Editar productos existentes</h2>
    <table className="table-form">
      <tbody>
        <tr>
          <td>
            <input 
              type="text" 
              placeholder="Nombre del producto" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)}
              className="input-field"
            />
          </td>
        </tr>
        <tr>
          <td>
            <input 
              type="number" 
              placeholder="Cantidad a agregar" 
              value={cantidad} 
              onChange={(e) => setCantidad(e.target.value)}
              className="input-field"
            />
          </td>
        </tr>
        <tr>
          <td>
            <button 
              onClick={registrarEntrada} 
              className="boton-registro"
            >
              Actualizar cantidad del producto
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    {mensaje && <p>{mensaje}</p>}
  </div>
</div>
  );
};
export default EntradaProductos;
