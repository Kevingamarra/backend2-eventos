import productsRepository from "../repositories/products.repository.js";

class ProductsService {
  async getAll(query) {
    let { limit = 10, page = 1, sort, query: category } = query;

    limit = parseInt(limit);
    page = parseInt(page);

    const filter = {};

    if (category) {
      filter.category = category;
    }

    const sortOption = {};

    if (sort === "asc") sortOption.price = 1;
    if (sort === "desc") sortOption.price = -1;

    const { products, totalProducts } =
      await productsRepository.getAll(
        filter,
        sortOption,
        page,
        limit
      );

    const totalPages = Math.ceil(totalProducts / limit);

    return {
      payload: products,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?page=${page - 1}` : null,
      nextLink: page < totalPages ? `/api/products?page=${page + 1}` : null
    };
  }

  async getById(id) {
    return await productsRepository.getById(id);
  }

  async create(productData) {
    return await productsRepository.create(productData);
  }

  async delete(id) {
    return await productsRepository.delete(id);
  }
}

export default new ProductsService();
