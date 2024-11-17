import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css';

const Cart = ({ cart, updateQuantity, removeFromCart, totalAmount }) => {
  const navigate = useNavigate(); // Hook de React Router para navegar entre páginas.

  // Función para manejar la navegación hacia la página de checkout.
  const handleCheckout = () => {
    navigate('/checkout'); // Redirige al usuario a la ruta '/checkout'.
  };

  return (
    <div className="cart">
      <h3>Compras</h3>
      {cart.length === 0 ? ( // Si el carrito está vacío, muestra un mensaje.
        <p>Carrito vacío</p>
      ) : (
        <div>
          {/* Mapea los productos en el carrito para mostrarlos en la lista */}
          {cart.map(item => (
            <div key={item.idProductos} className="cart-item">
              {/* Muestra la imagen del producto */}
              <img src={require('../images/' + item.imagen)} alt={item.nombre} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h4>{item.nombre}</h4> {/* Nombre del producto */}
                <p>${item.precio} x {item.quantity}</p> {/* Precio y cantidad */}
                
                {/* Botón para eliminar el producto del carrito */}
                <Button label="Eliminar" onClick={() => removeFromCart(item.idProductos)} />

                {/* Botones para aumentar o disminuir la cantidad del producto */}
                <Button label="+" onClick={() => updateQuantity(item, item.quantity + 1)} />
                <Button label="-" onClick={() => updateQuantity(item, item.quantity - 1)} />
              </div>
            </div>
          ))}

          {/* Sección del total y el botón para proceder al checkout */}
          <div className="cart-total">
            <h4>Total: ${totalAmount}</h4> {/* Muestra el monto total del carrito */}
            <Button label="Comprar" className="buy-button" onClick={handleCheckout} /> {/* Botón para comprar */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
