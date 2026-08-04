import cartsService from "../services/carts.service.js";

const getCarts = async (req, res) => {
  try {
    const carts = await cartsService.getAll();

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
    const cart = await cartsService.getById(req.params.cid);

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
    const newCart = await cartsService.create();

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
    const cart = await cartsService.addProduct(
      req.params.cid,
      req.params.pid
    );

    res.json(cart);
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message
    });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const cart = await cartsService.deleteProduct(
      req.params.cid,
      req.params.pid
    );

    res.json(cart);
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message
    });
  }
};

const clearCart = async (req, res) => {
  try {
    await cartsService.clear(req.params.cid);

    res.json({
      status: "success",
      message: "Carrito vaciado"
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await cartsService.update(
      req.params.cid,
      req.body.products
    );

    res.json(cart);
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message
    });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const cart = await cartsService.updateProductQuantity(
      req.params.cid,
      req.params.pid,
      req.body.quantity
    );

    res.json(cart);
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message
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
