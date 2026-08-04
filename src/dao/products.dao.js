import Product from "../models/Product.js";

class ProductsDAO {
  async getAll(filter, sortOption, page, limit) {
    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      products,
      totalProducts
    };
  }

  async getById(id) {
    return await Product.findById(id);
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductsDAO();
