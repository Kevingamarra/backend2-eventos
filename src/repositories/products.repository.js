import productsDAO from "../dao/products.dao.js";

class ProductsRepository {
  async getAll(filter, sortOption, page, limit) {
    return await productsDAO.getAll(
      filter,
      sortOption,
      page,
      limit
    );
  }

  async getById(id) {
    return await productsDAO.getById(id);
  }

  async create(productData) {
    return await productsDAO.create(productData);
  }

  async delete(id) {
    return await productsDAO.delete(id);
  }
}

export default new ProductsRepository();
