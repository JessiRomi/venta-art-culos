import { Button } from 'primereact/button';
import '../Styles/Home.css';

// Componente de barra de navegación
const NavBar = ({ toggleCart, cart }) => {
  return (
    <div className="navbar">
      <h1>Tienda Jazmin</h1>
      {/* Botón para mostrar/ocultar el carrito */}
      {/* Muestra el ícono de carrito y el número de productos en el carrito */}
      <Button icon="pi pi-shopping-cart" label={`Carrito (${cart.length})`} onClick={toggleCart} />
    </div>
  );
};

export default NavBar;

