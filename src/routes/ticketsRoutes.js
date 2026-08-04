import express from "express";

import {
  getMyTickets,
  cancelTicket
} from "../controllers/ticketsController.js";

import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/my-tickets",
  auth,
  getMyTickets
);

router.patch(
  "/:tid/cancel",
  auth,
  cancelTicket
);

export default router;
