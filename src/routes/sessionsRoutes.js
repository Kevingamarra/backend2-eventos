import { Router } from "express";
import passport from "passport";

import {
  register,
  login,
  current,
  logout
} from "../controllers/sessionsController.js";

const router = Router();

router.post("/register", (req, res, next) => {
  passport.authenticate("register", { session: false }, (err, user) => {
    if (err) {
      return res.status(400).json({
        status: "error",
        message: err.message
      });
    }

    req.user = user;

    next();
  })(req, res, next);
}, register);

router.post("/login", (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: info?.message || "Credenciales inválidas"
      });
    }

    req.user = user;

    next();
  })(req, res, next);
}, login);

router.get("/current", (req, res, next) => {
  passport.authenticate("current", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "No autenticado"
      });
    }

    req.user = user;

    next();
  })(req, res, next);
}, current);

router.post("/logout", logout);

export default router;
