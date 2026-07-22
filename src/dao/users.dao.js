import User from "../models/User.js";

class UsersDAO {
  async getByEmail(email) {
    return await User.findOne({ email });
  }

  async create(userData) {
    return await User.create(userData);
  }
}

export default new UsersDAO();
