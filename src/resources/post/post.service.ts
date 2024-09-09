import {
    createProduct as createProductTask,
    deleteById as deleteProductById,
    getAll as getProductAll,
    getById as getProductById,
    updateById as updateProductById,
  } from './post.memory.repository';
  import Product from './post.model';
  
  const getAll = () => getProductAll();
  const getById = (id: string) => getProductById(id);
  
  const createProduct = ({ id, title, text, createdAt, sers, comments}: Product) => 
    createProductTask({ id, title, text, createdAt, sers, comments});
  
  const deleteById = (id: string) => deleteProductById(id);
  
  const updateById = ({ id, title, text, createdAt, sers, comments}: Product) => 
    updateProductById({ id, title, text, createdAt, sers, comments});
  
  export {
    createProduct,
    deleteById,
    getAll,
    getById,
    updateById
  };
  
  