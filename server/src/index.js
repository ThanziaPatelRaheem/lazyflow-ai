import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

//TEst route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LazyFLow API is running",
  });
});

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
