import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:pid", getProductById);
router.post("/", createProduct);
router.delete("/:pid", deleteProduct);

export default router;
