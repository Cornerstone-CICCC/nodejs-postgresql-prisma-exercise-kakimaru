import { Request, Response } from "express";
import productModel from "../models/product.model";
import { Product } from "@prisma/client";

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.fetchAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get all products" });
  }
};

// get product by id
const getProductById = async (req: Request<{ id: number }>, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await productModel.fetchProductById(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to find the product" });
  }
};

// create product
const addProduct = async (req: Request, res: Response) => {
  try {
    const { productName, price } = req.body;
    const newProduct = await productModel.createProduct({ productName, price });
    res.status(200).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to create new product" });
  }
};

// update product
const updateProductById = async (
  req: Request<{ id: number }, {}, Omit<Product, "id">>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { productName, price } = req.body;
    const updatedProduct = await productModel.updateProduct(id, {
      productName,
      price,
    });
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to update product" });
  }
};

// delete
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deletedProduct = await productModel.deleteProduct(id);
    if (!deletedProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.status(200).json(deletedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to delete the product" });
  }
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
};
