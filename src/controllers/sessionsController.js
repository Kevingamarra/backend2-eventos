import sessionsService from "../services/sessions.service.js";

export const register = async (req, res) => {
  try {
    const user = await sessionsService.register(req.body);

    res.status(201).json({
      status: "success",
      payload: user
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};
