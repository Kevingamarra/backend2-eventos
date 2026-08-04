import usersService from "../services/users.service.js";

export const getUsers = async (req, res) => {
  try {
    const users = await usersService.getAll();

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
