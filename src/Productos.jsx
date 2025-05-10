import { useState } from 'react';
import { Link } from 'react-router-dom';

function Productos() {
  const [productos, setProductos] = useState([]);

  const agregarProducto = (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value.trim();
    const precio = parseFloat(e.target.precio.value) || 0;
    const cantidad = parseInt(e.target.cantidad.value) || 0;

    if (!nombre) {
      alert('El nombre del producto no puede estar vacío.');
      return;
    }

    const nuevoProducto = { nombre, precio, cantidad };
    setProductos([...productos, nuevoProducto]);
    e.target.reset();
  };

  const editarProducto = (index) => {
    const productoEditar = productos[index];

    const nuevoNombre = prompt('Nuevo nombre:', productoEditar.nombre)?.trim() || productoEditar.nombre;
    const nuevoPrecio = parseFloat(prompt('Nuevo precio:', productoEditar.precio)) || productoEditar.precio;
    const nuevaCantidad = parseInt(prompt('Nueva cantidad:', productoEditar.cantidad)) || productoEditar.cantidad;

    const productosActualizados = [...productos];
    productosActualizados[index] = { nombre: nuevoNombre, precio: nuevoPrecio, cantidad: nuevaCantidad };

    setProductos(productosActualizados);
  };

  const eliminarProducto = (index) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setProductos(productos.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      <h1>Módulo de Productos</h1>
      <p>Se podrá agregar, editar y eliminar productos.</p>

      <form onSubmit={agregarProducto} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>Nombre del producto:</label>
        <input type="text" name="nombre" required />

        <label>Precio:</label>
        <input type="number" name="precio" min="0" step="0.01" required />

        <label>Cantidad:</label>
        <input type="number" name="cantidad" min="0" required />

        <button style={{ backgroundColor: 'orange', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' }} type="submit">
          Agregar Producto
        </button>
      </form>

      <h2>Lista de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos agregados.</p>
      ) : (
        <ul>
          {productos.map((producto, index) => (
            <li key={index}>
              {producto.nombre} -{' '}
              {producto.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} - Cantidad: {producto.cantidad}
              <button style={{ backgroundColor: 'blue', color: 'white', marginLeft: '10px' }} onClick={() => editarProducto(index)}>
                Editar
              </button>
              <button style={{ backgroundColor: 'red', color: 'white', marginLeft: '5px' }} onClick={() => eliminarProducto(index)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Enlaces a otras páginas */}
      <nav>
        <Link to="/entradaproductos" style={{ marginRight: '10px' }}>Ir a Entrada de Productos</Link>
        <Link to="/">Volver al Inicio</Link>
      </nav>
    </div>
  );
}

export default Productos;
