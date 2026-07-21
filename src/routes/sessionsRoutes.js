import express from "express";
import { getSessions } from "../controllers/sessionsController.js";

const router = express.Router();

router.get("/", getSessions);

export default router;
