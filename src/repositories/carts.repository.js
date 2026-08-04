import cartsDAO from "../dao/carts.dao.js";

class CartsRepository {
  async getAll() {
    return await cartsDAO.getAll();
  }

  async getById(id) {
    return await cartsDAO.getById(id);
  }

  async getByIdWithoutPopulate(id) {
    return await cartsDAO.getByIdWithoutPopulate(id);
  }

  async create() {
    return await cartsDAO.create();
  }

  async update(id, data) {
    return await cartsDAO.update(id, data);
  }

  async save(cart) {
    return await cartsDAO.save(cart);
  }
}

export default new CartsRepository();
