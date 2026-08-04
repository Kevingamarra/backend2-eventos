import cartsRepository from "../repositories/carts.repository.js";

class CartsService {
  async getAll() {
    return await cartsRepository.getAll();
  }

  async getById(id) {
    return await cartsRepository.getById(id);
  }

  async create() {
    return await cartsRepository.create();
  }

  async addProduct(cid, pid) {
    const cart = await cartsRepository.getByIdWithoutPopulate(cid);

    if (!cart) {
      throw new Error("Carrito no encontrado");
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

    return await cartsRepository.save(cart);
  }

  async deleteProduct(cid, pid) {
    const cart = await cartsRepository.getByIdWithoutPopulate(cid);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    cart.products = cart.products.filter(
      p => p.product.toString() !== pid
    );

    return await cartsRepository.save(cart);
  }

  async clear(cid) {
    return await cartsRepository.update(cid, {
      products: []
    });
  }

  async update(cid, products) {
    return await cartsRepository.update(cid, {
      products
    });
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await cartsRepository.getByIdWithoutPopulate(cid);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    const product = cart.products.find(
      p => p.product.toString() === pid
    );

    if (!product) {
      throw new Error("Producto no encontrado en el carrito");
    }

    product.quantity = quantity;

    return await cartsRepository.save(cart);
  }
}

export default new CartsService();
