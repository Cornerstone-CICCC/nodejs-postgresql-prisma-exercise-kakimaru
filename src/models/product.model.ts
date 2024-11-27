import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

// get all products
const fetchAllProducts = async () => {
  return await prisma.product.findMany();
};

// get product by id
const fetchProductById = async (id: number) => {
  return await prisma.product.findUnique({ where: { id } });
};

// create new product
const createProduct = async (data: Omit<Product, "id">) => {
  return await prisma.product.create({ data });
};

// update product
const updateProduct = async (
  id: number,
  data: Partial<Omit<Product, "id">>
) => {
  return await prisma.product.update({ where: { id }, data });
};

// delete
const deleteProduct = async (id: number) => {
  return await prisma.product.delete({ where: { id } });
};

export default {
  fetchAllProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
