import { Router } from "express";
import {
  register,
  login,
  current,
  logout
} from "../controllers/sessionsController.js";

import validateRegister from "../middlewares/validateRegister.js";
import auth from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/register", validateRegister, register);

router.post("/login", login);

router.get("/current", auth, current);

router.post("/logout", logout);


export default router;
