import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export const createProduct = async (req) => {
  try {
    const { name, description, price, stock } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price, stock },
    });
    return product;
  } catch (error) {
    throw error;
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
      },
      orderBy: {
        createdAt: "desc",
      }
    });
    return products;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    return product;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        updatedAt: true,
      }
    });
    return product;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const product = await prisma.product.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
      }
    });
    return product;
  } catch (error) {
    throw error;
  }
};