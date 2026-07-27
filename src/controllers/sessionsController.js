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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await sessionsService.login(email, password);

    res.cookie("currentUser", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 3600000,
      secure: process.env.NODE_ENV === "production"
    });

    res.json({
      status: "success",
      message: "Login correcto"
    });
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message
    });
  }
};

export const current = (req, res) => {
  res.json({
    status: "success",
    payload: req.user
  });
};

export const logout = (req, res) => {
  res.clearCookie("currentUser");

  res.json({
    status: "success",
    message: "Sesión cerrada"
  });
};
