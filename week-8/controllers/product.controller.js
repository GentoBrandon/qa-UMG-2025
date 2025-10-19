import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../services/product.service.js";
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
    const product = await createProduct(req);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProductsController = async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const product = await updateProduct(id, req.body);
    res.status(200).json(product);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Product not found or already deleted" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await deleteProduct(id);
    res.status(200).json(product);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(500).json({ error: error.message });
  }
};
