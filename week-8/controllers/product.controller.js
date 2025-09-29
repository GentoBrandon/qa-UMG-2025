import { createProduct, getProducts } from "../services/product.service.js";
import { body, validationResult } from "express-validator";

export const productValidation = [
  body("name").isString().notEmpty(),
  body("description").isString().notEmpty(),
  body("price").isFloat().notEmpty(),
  body("stock").isInt().notEmpty(),
];

export const createProductsController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const product = await createProduct(req, res);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsController = async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
