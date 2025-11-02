import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // ✅ Must be called before connectDB()

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// Connect DB & Start Server
connectDB();

app.listen(process.env.PORT || 5001, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5001}`);
});
