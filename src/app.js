import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

import initializePassport from "./config/passport.config.js";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import sessionsRoutes from "./routes/sessionsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

initializePassport();

app.use(passport.initialize());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Servidor activo"
  });
});

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/users", usersRoutes);

app.use(errorHandler);

export default app;
