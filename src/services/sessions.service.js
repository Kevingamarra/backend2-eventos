import usersRepository from "../repositories/users.repository.js";
import { createHash } from "../utils/hash.js";

class SessionsService {
  async register(userData) {
    const { first_name, last_name, email, password } = userData;

    if (!first_name || !last_name || !email || !password) {
      throw new Error("Todos los campos son obligatorios");
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      throw new Error("Email inválido");
    }

    if (password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }

    const existingUser = await usersRepository.getByEmail(normalizedEmail);

    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    const newUser = await usersRepository.create({
      first_name,
      last_name,
      email: normalizedEmail,
      password: createHash(password),
      role: "user"
    });

    const user = newUser.toObject();

    delete user.password;

    return user;
  }
}

export default new SessionsService();
