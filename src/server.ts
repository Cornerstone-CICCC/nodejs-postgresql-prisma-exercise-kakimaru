import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product.routes";
dotenv.config();

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/products", productRouter);

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
