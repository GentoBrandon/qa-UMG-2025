import express from 'express';
import { createProductsController, getProductsController, productValidation } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.post('/products-create', productValidation, createProductsController);
productRouter.get('/products-get', getProductsController);

export default productRouter;
