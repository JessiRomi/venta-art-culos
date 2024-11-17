import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import '../Styles/Home.css';
import axios from 'axios';

// Componente para mostrar la lista de productos
const ProductList = ({ addToCart }) => {
  const [productos, setProductos] = useState([]); // estado para almacenar los productos
  const [showEditForm, setShowEditForm] = useState(false); // estado para controlar la visibilidad del formulario de edición
  const [selectedProduct, setSelectedProduct] = useState(null); // estado para almacenar el producto seleccionado
  const [showForm, setShowForm] = useState(false); // estado para controlar la visibilidad del formulario para agregar productos
 
  // estado para almacenar los datos del nuevo producto
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio: '',
    imagen: ''
  });

  // Función para manejar el cambio en los campos del formulario
  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Función para enviar el formulario a la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    newProduct.precio = parseFloat(newProduct.precio);

    try {
      await axios.post("http://localhost:3300/api/producto", newProduct);
      //vuelve a cargar el listado de productos
      const response = await axios.get('http://localhost:3300/api/producto');
      setProductos(response.data);

      setShowForm(false); // Cierra el formulario al enviar
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
 };

 // Función para cargar los productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3300/api/producto');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []); // se ejecuta solo una vez cuando el componente se monta

  // Función para abrir el formulario de edición
  const openEditForm = (product) => {
    setSelectedProduct(product); // selecciona el producto a editar
    setShowEditForm(true); // abre el formulario
  };

  // Función para manejar el cambio en los campos del formulario de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  // Función para actualizar el producto
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      //realiza la solicitud PUT para actualizar el producto
      console.log("ID del producto a actualizar:", selectedProduct.idProductos);
      const response = await axios.put(`http://localhost:3300/api/producto/${selectedProduct.idProductos}`, selectedProduct);
      
      //actualiza el listado de productos en el estado
      setProductos(productos.map((product) =>
        product.idProductos === selectedProduct.idProductos ? response.data : product
      ));

      //cierra el formulario
      setShowEditForm(false);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  // Función para eliminar un producto
  const handleDelete = async (id) => {
    try {
      //realiza la solicitud DELETE para eliminar el producto
      await axios.delete(`http://localhost:3300/api/producto/${id}`);
      
      //filtra el producto eliminado del listado de productos 
      setProductos(productos.filter((product) => product.idProductos !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div>
    <Button label="Agregar" onClick={() => setShowForm(true)} /> {/* Botón para abrir el formulario */}
    <div className="product-list">
      
      {productos.map((product) => (
        <div key={product.idProductos} className="product-card">
          <img src={require(`../images/${product.imagen}`)} alt={product.nombre} className="product-image" />
          <h3>{product.nombre}</h3>
          <p>${product.precio}</p>
          <div className="product-buttons">
            <Button label="Comprar" className="cart-button" onClick={() => addToCart(product)} />
            <Button label="Editar" className="cart-button" onClick={() => openEditForm(product)} />
            <Button label="Eliminar" className="cart-button" onClick={() => handleDelete(product.idProductos)} />
          </div>
        </div>
      ))}
      
        {/* Formulario emergente para editar un producto */}
      {showEditForm && selectedProduct && (
        <div className="form-overlay">
          <form className="product-form" onSubmit={handleUpdate}>
            <h2>Editar Producto</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del Producto"
              value={selectedProduct.nombre}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={selectedProduct.precio}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="imagen"
              placeholder="URL de la Imagen"
              value={selectedProduct.imagen}
              onChange={handleInputChange}
            />
            <Button label="Actualizar Producto" type="submit" className="cart-button" />
            <Button label="Cancelar" type="button" className="cart-button" onClick={() => setShowEditForm(false)} />
          </form>
        </div>
      )}

      {/* Formulario emergente para agregar un producto */}
      {showForm && (
        <div className="form-overlay">
          <form className="product-form" onSubmit={handleSubmit}>
            <h2>Agregar Producto</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del Producto"
              value={newProduct.nombre}
              onChange={handleInput}
              required
            />
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={newProduct.precio}
              onChange={handleInput}
              required
            />
            <input
              type="text"
              name="imagen"
              placeholder="URL de la Imagen"
              value={newProduct.imagen}
              onChange={handleInput}
            />
            <Button label="Guardar Producto" type="submit" className="p-button-success" />
            <Button label="Cancelar" type="button" className="p-button-secondary" onClick={() => setShowForm(false)} />
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default ProductList;
