import Cart from "../models/Cart.js";

const getCarts = async (req, res) => {
  const carts = await Cart.find().populate("products.product");
  res.json(carts);
};

const getCartById = async (req, res) => {
  const { cid } = req.params;
  const cart = await Cart.findById(cid).populate("products.product");
  res.json(cart);
};

const createCart = async (req, res) => {
  const newCart = await Cart.create({ products: [] });
  res.json(newCart);
};

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;

  const cart = await Cart.findById(cid);

  const productIndex = cart.products.findIndex(
    p => p.product.toString() === pid
  );

  if (productIndex !== -1) {
    cart.products[productIndex].quantity += 1;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  await cart.save();
  res.json(cart);
};

const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;

  const cart = await Cart.findById(cid);

  cart.products = cart.products.filter(
    p => p.product.toString() !== pid
  );

  await cart.save();
  res.json(cart);
};

const clearCart = async (req, res) => {
  const { cid } = req.params;
  await Cart.findByIdAndUpdate(cid, { products: [] });
  res.json({ message: "Carrito vaciado" });
};

const updateCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  const cart = await Cart.findByIdAndUpdate(
    cid,
    { products },
    { new: true }
  );

  res.json(cart);
};

const updateProductQuantity = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findById(cid);

  const product = cart.products.find(
    p => p.product.toString() === pid
  );

  if (product) {
    product.quantity = quantity;
  }

  await cart.save();
  res.json(cart);
};

export {
  getCarts,
  getCartById,
  createCart,
  addProductToCart,
  deleteProductFromCart,
  clearCart,
  updateCart,
  updateProductQuantity
};
