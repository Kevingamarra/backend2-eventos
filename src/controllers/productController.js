import productsService from "../services/products.service.js";

const getProducts = async (req, res) => {
  try {
    const products = await productsService.getAll(req.query);
    res.json({
      status: "success",
      ...products
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener productos"
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productsService.getById(req.params.pid);

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado"
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener producto"
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await productsService.create(req.body);

    res.json(newProduct);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear producto"
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productsService.delete(req.params.pid);

    res.json({
      message: "Producto eliminado"
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar producto"
    });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct
};
