import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import usersRepository from "../repositories/users.repository.js";
import { createHash, isValidPassword } from "../utils/hash.js";

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies.currentUser;
  }

  return token;
};

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name } = req.body;

          const normalizedEmail = email.trim().toLowerCase();

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!first_name || !last_name || !email || !password) {
            return done(new Error("Todos los campos son obligatorios"));
          }

          if (!emailRegex.test(normalizedEmail)) {
            return done(new Error("Email inválido"));
          }

          if (password.length < 6) {
            return done(
              new Error("La contraseña debe tener al menos 6 caracteres")
            );
          }

          const existingUser = await usersRepository.getByEmail(normalizedEmail);

          if (existingUser) {
            return done(new Error("El email ya está registrado"));
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

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email"
      },
      async (email, password, done) => {
        try {
          const normalizedEmail = email.trim().toLowerCase();

          const user = await usersRepository.getByEmail(normalizedEmail);

          if (!user) {
            return done(null, false, {
              message: "Credenciales inválidas"
            });
          }

          if (!isValidPassword(user, password)) {
            return done(null, false, {
              message: "Credenciales inválidas"
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "current",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          cookieExtractor
        ]),
        secretOrKey: process.env.JWT_SECRET
      },
      async (payload, done) => {
        try {
          return done(null, {
            id: payload.id,
            email: payload.email,
            role: payload.role
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
