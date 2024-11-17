import React from 'react';
import { Button } from 'primereact/button';

const Product = ({ product, addToCart }) => (
  <div className="product">
    <img src={product.image} alt={product.name} />
    <h4>{product.name}</h4> {/* Nombre del producto*/}
    <p>${product.price}</p> {/*Precio del producto*/}
    {/* Botón para agregar el producto al carrito */}
    <Button label="Agregar" icon="pi pi-shopping-cart" onClick={() => addToCart(product)} />
  </div>
);

export default Product;
