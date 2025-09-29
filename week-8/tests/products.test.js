import { describe, it, expect, afterAll } from "vitest";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

describe("products", () => {
  afterAll(async () => {
    await prisma.product.deleteMany();
    await prisma.$disconnect();
  });

  it("should create a product", async () => {
    const product = await prisma.product.create({
      data: {
        name: "Product 1",
        description: "Description 1", 
        price: 100,
        stock: 10
      }
    });

    expect(product).toBeDefined();
    expect(product.name).toBe("Product 1");
    expect(product.description).toBe("Description 1");
    expect(product.price).toBe(100);
    expect(product.stock).toBe(10);
  });

  it("should get products", async () => {
    const products = await prisma.product.findMany();
    
    expect(products).toHaveLength(1);
    expect(products[0].name).toBe("Product 1");
    expect(products[0].description).toBe("Description 1");
  });

  it("should delete a product", async () => {
    const products = await prisma.product.findMany();
    const productId = products[0].id;

    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId
      }
    });

    expect(deletedProduct).toBeDefined();
    expect(deletedProduct.id).toBe(productId);

    const remainingProducts = await prisma.product.findMany();
    expect(remainingProducts).toHaveLength(0);
  });
});