import logo from ".src./assets/logo.png"; // Ruta del logo

function LogoInventario() {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <img src={logo} alt="Logo Inventario" style={{ width: "150px" }} />
    </div>
  );
}

export default LogoInventario;
