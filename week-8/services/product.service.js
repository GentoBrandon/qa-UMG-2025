import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price, stock },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
      }
    });
    return products;
  } catch (error) {
    throw error;
  }
};