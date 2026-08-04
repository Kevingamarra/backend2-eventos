import usersDAO from "../dao/users.dao.js";

class UsersRepository {
  async getAll() {
    return await usersDAO.getAll();
  }

  async getById(id) {
    return await usersDAO.getById(id);
  }

  async getByEmail(email) {
    return await usersDAO.getByEmail(email);
  }

  async create(userData) {
    return await usersDAO.create(userData);
  }
}

export default new UsersRepository();
