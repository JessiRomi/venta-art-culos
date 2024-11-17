import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../routes/productRoutes';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

// Componente para gestionar productos
const ProductCrud = () => {
  const [products, setProducts] = useState([]); //estado para almacenar los productos
  const [productDialog, setProductDialog] = useState(false); // estado para controlar la visibilidad del modal de productos
  const [product, setProduct] = useState({ id: null, name: '', price: 0 }); // estado para almacenar el producto actual
  const [isEdit, setIsEdit] = useState(false); // estado para indicar si estamos editando un producto

  // useEffect para cargar los productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, []);

  // Función para cargar los productos
  const loadProducts = async () => {
    try {
      const response = await getProducts(); //  llamada a la api para obtener los productos
      setProducts(response.data); // actualiza el estado con los productos
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  // Función para abrir el modal de productos
  const openNew = () => {
    setProduct({ id: null, name: '', price: 0 }); // reinicia el estado del producto
    setIsEdit(false); //cambia a modo de creación
    setProductDialog(true); // abre el modal
  };

  // Función para cerrar el modal de productos
  const hideDialog = () => {
    setProductDialog(false);
  };

  // Función para guardar el producto
  const saveProduct = async () => {
    try {
      if (isEdit) {
        await updateProduct(product.id, product); // llama a la api para actualizar el producto
      } else {
        await createProduct(product); //crear un nuevo producto
      }
      loadProducts(); //actualiza la lista de productos
      setProductDialog(false); //cierra el modal
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  // Función para editar un producto
  const editProduct = (product) => { 
    setProduct({ ...product }); //copia el producto a editar
    setIsEdit(true); //cambia a modo de edición
    setProductDialog(true); // abre el modal
  };

  // Función para eliminar un producto
  const confirmDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      loadProducts(); //actualiza la lista de productos
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  // Función para renderizar el modal de productos
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );

  return (
    <div>
      <h2>Administrar Productos</h2>
      <Button label="Nuevo Producto" icon="pi pi-plus" onClick={openNew} />
      <DataTable value={products} responsiveLayout="scroll">
        <Column field="name" header="Nombre" />
        <Column field="price" header="Precio" />
        <Column header="Acciones" body={(rowData) => (
          <>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData.id)} />
          </>
        )}/>
      </DataTable>

      {/* Modal para editar o crear un producto */}
      <Dialog visible={productDialog} style={{ width: '400px' }} header="Detalles del Producto" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <InputText id="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="price">Precio</label>
          <InputText id="price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
        </div>
      </Dialog>
    </div>
  );
};

export default ProductCrud;

