import usersRepository from "../repositories/users.repository.js";

class UsersService {
  async getAll() {
    return await usersRepository.getAll();
  }
}

export default new UsersService();
