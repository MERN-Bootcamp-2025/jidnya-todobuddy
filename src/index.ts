import express from "express";
import authRoutes from "./routes/auth.routes";
import { AppDataSource } from "./config/database";
import dotenv from "dotenv";
import "reflect-metadata";
import { admin } from "./superAdmin/super.admin";
import userRoutes from "./routes/user.routes"
import todoRoutes from './routes/todo.routes'; 

dotenv.config();
(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");
    await admin();
    const app = express();
    app.use(express.json());

    // routes
    app.use("/api", authRoutes);
    app.use("/api", userRoutes);
    app.use("/api", todoRoutes);


    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
