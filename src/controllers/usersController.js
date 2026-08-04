import usersRepository from "../repositories/users.repository.js";

export const getUsers = async (req, res) => {
  try {
    const users = await usersRepository.getAll();

    res.json({
      status: "success",
      payload: users
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};
