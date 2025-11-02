// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

/* ========================
   ✅ MIDDLEWARES
======================== */
app.use(cors());
app.use(express.json());

/* ========================
   ✅ DATABASE CONNECTION
======================== */
connectDB();

/* ========================
   ✅ ROUTES
======================== */
app.use("/api/auth", authRoutes);

/* ========================
   ✅ ROOT ROUTE
======================== */
app.get("/", (req, res) => {
  res.send("🌿 Arz-e-Pak Backend Running Successfully!");
});

/* ========================
   ✅ SERVER START
======================== */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
