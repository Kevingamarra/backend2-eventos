import express from "express";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import sessionsRoutes from "./routes/sessionsRoutes.js";

const app = express();

app.use(express.json());

// Health Check
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

export default app;
