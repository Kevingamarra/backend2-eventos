import express from "express";

import {
  getCarts,
  getCartById,
  createCart,
  addProductToCart,
  deleteProductFromCart,
  clearCart,
  updateCart,
  updateProductQuantity
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCarts);
router.get("/:cid", getCartById);
router.post("/", createCart);
router.post("/:cid/products/:pid", addProductToCart);

router.put("/:cid", updateCart);
router.put("/:cid/products/:pid", updateProductQuantity);

router.delete("/:cid/products/:pid", deleteProductFromCart);
router.delete("/:cid", clearCart);

export default router;
