import Cart from "../models/Cart.js";

const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate("products.product");
    res.json(carts);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener los carritos"
    });
  }
};

const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid).populate("products.product");

    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Carrito no encontrado"
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener el carrito"
    });
  }
};

const createCart = async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] });
    res.json(newCart);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al crear el carrito"
    });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Carrito no encontrado"
      });
    }

    const productIndex = cart.products.findIndex(
      p => p.product.toString() === pid
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({
        product: pid,
        quantity: 1
      });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al agregar el producto al carrito"
    });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Carrito no encontrado"
      });
    }

    cart.products = cart.products.filter(
      p => p.product.toString() !== pid
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al eliminar el producto del carrito"
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findByIdAndUpdate(
      cid,
      { products: [] },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Carrito no encontrado"
      });
    }

    res.json({
      status: "success",
      message: "Carrito vaciado"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al vaciar el carrito"
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      cid,
      { products },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Carrito no encontrado"
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al actualizar el carrito"
    });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Carrito no encontrado"
      });
    }

    const product = cart.products.find(
      p => p.product.toString() === pid
    );

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado en el carrito"
      });
    }

    product.quantity = quantity;

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al actualizar la cantidad del producto"
    });
  }
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
