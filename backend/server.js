import express from "express";
import ApiError, { errorHandler } from "./middleware/error-handler.js";
import cors from "cors";
import v1Router from "./routes/v1.js";
import connectDB from "./config/mongo-db.js";
import config from "./config/index.js";

const app = express();

// cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.options("*", cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Health and Diet Tracker API",
    version: "1.0.0",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
app.use("/v1", v1Router);

app.use((req, res, next) => {
  next(
    new ApiError(
      404,
      "Route not found",
      "NOT_FOUND",
      `The requested URL ${req.originalUrl} was not found on this server.`
    )
  );
});

// Error handler: log and delegate to the reusable errorHandler
app.use((err, req, res, next) => {
  console.error(err.stack);
  errorHandler(err, req, res, next);
});

// Start server
const PORT = config.PORT || 5050;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
