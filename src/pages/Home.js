import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../Styles/Home.css';

const Home = () => {
  const [cart, setCart] = useState([]); // Carrito de compras
  const [cartVisible, setCartVisible] = useState(false); // Estado para controlar la visibilidad del carrito

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    // Verifica si el producto ya existe en el carrito
    const existingProduct = cart.find(item => item.id === product.idProductos);
   
   // Si el producto ya existe, aumenta su cantidad
    if (existingProduct) {
      updateQuantity(existingProduct, existingProduct.quantity + 1);
    } else {
      // Si el producto no existe, lo agrega al carrito
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (product, quantity) => {

    // Actualiza la cantidad del producto en el carrito
    setCart(cart.map(item => item.id === product.idProductos ? { ...item, quantity } : item));
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    //Filtra el carrito para eliminar el producto con el id correspondiente
    setCart(cart.filter(item => item.idProductos !== productId));
  };

  // Función para alternar la visibilidad del carrito
  const toggleCart = () => {
    // Alterna la visibilidad del carrito
    setCartVisible(!cartVisible);
  };

  // Calcula el total de la cantidad de productos en el carrito
  const totalAmount = cart.reduce((total, item) => total + (item.precio * item.quantity), 0);

  return (
    <div className="home">
     {/* Componente de la barra de navegación, pasando la función toggleCart para controlar la visibilidad del carrito */} 
      <NavBar toggleCart={toggleCart} cart={cart} />
      <div className="product-list">
        <ProductList addToCart={addToCart} />
      </div>
      {/* Si el carrito está visible, muestra el componente del carrito */}
      {cartVisible && (
        <Cart
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          totalAmount={totalAmount}
        />
      )}
      <Footer />
    </div>
  );
};

export default Home;
