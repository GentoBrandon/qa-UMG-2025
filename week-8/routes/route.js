import express from 'express';
import { createProductsController, getProductsController, productValidation, getProductByIdController, updateProductController, deleteProductController } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.post('/products-create', productValidation, createProductsController);
productRouter.get('/products-get', getProductsController);
productRouter.get('/products-get/:id', getProductByIdController);
productRouter.put('/products-update/:id', productValidation, updateProductController);
productRouter.delete('/products-delete/:id', deleteProductController);

export default productRouter;
