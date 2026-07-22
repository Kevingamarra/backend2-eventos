const validateRegister = (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Todos los campos son obligatorios"
    });
  }

  next();
};

export default validateRegister;
