import { describe, it, expect, afterAll, beforeEach } from "vitest";
import { PrismaClient } from "../generated/prisma/client.js";
import { 
  createProductsController, 
  getProductsController, 
  getProductByIdController,
  deleteProductController 
} from "../controllers/product.controller.js";

const prisma = new PrismaClient();

describe("Database Tests", () => {
  let createdProductId;

  beforeEach(async () => {
    await prisma.product.deleteMany();
  });

  afterAll(async () => {
    await prisma.product.deleteMany();
    await prisma.$disconnect();
  });

  it("should create a product and validate response format", async () => {
    const req = {
      body: {
        name: "Test Product",
        description: "A test product description", 
        price: 99.99,
        stock: 50
      }
    };
    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = data;
        return this;
      }
    };

    await createProductsController(req, res);
    
    expect(res.statusCode).toBe(201);
    
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'Test Product');
    expect(res.body).toHaveProperty('description', 'A test product description');
    expect(res.body).toHaveProperty('price', 99.99);
    expect(res.body).toHaveProperty('stock', 50);
    expect(typeof res.body.id).toBe('string'); 
    
    createdProductId = res.body.id;
  });

  it("should get all products and validate database state", async () => {
    
    const product = await prisma.product.create({
      data: {
        name: "Database Product",
        description: "Created directly in database",
        price: 150.00,
        stock: 25
      }
    });

    const req = {};
    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = data;
        return this;
      }
    };

    await getProductsController(req, res);
    
    expect(res.statusCode).toBe(200);
    
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('id', product.id);
    expect(res.body[0]).toHaveProperty('name', 'Database Product');
    expect(res.body[0]).toHaveProperty('description', 'Created directly in database');
    expect(res.body[0]).toHaveProperty('price', 150.00);
    expect(res.body[0]).toHaveProperty('stock', 25);
  });

  it("should get product by ID and validate database query", async () => {
    const product = await prisma.product.create({
      data: {
        name: "Specific Product",
        description: "Product for ID lookup",
        price: 75.50,
        stock: 100
      }
    });

    const req = {
      params: { id: product.id }
    };
    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = data;
        return this;
      }
    };

    await getProductByIdController(req, res);
    
    expect(res.statusCode).toBe(200);
    
    
    expect(res.body).toHaveProperty('id', product.id);
    expect(res.body).toHaveProperty('name', 'Specific Product');
    expect(res.body).toHaveProperty('description', 'Product for ID lookup');
    expect(res.body).toHaveProperty('price', 75.50);
    expect(res.body).toHaveProperty('stock', 100);
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).toHaveProperty('updatedAt');
  });

  it("should delete product and validate database removal", async () => {
    const product = await prisma.product.create({
      data: {
        name: "Product to Delete",
        description: "This will be deleted",
        price: 200.00,
        stock: 5
      }
    });

    const beforeDelete = await prisma.product.findUnique({
      where: { id: product.id }
    });
    expect(beforeDelete).toBeTruthy();

    const req = {
      params: { id: product.id }
    };
    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = data;
        return this;
      }
    };

    await deleteProductController(req, res);
    
    expect(res.statusCode).toBe(200);
    
    expect(res.body).toHaveProperty('id', product.id);
    expect(res.body).toHaveProperty('name', 'Product to Delete');
    expect(res.body).toHaveProperty('description', 'This will be deleted');
    expect(res.body).toHaveProperty('price', 200.00);
    expect(res.body).toHaveProperty('stock', 5);

    const afterDelete = await prisma.product.findUnique({
      where: { id: product.id }
    });
    expect(afterDelete).toBeNull();

    const remainingProducts = await prisma.product.findMany();
    expect(remainingProducts).toHaveLength(0);
  });
});