import corsMiddleware from "./config/cors";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json";

import myDataRoutes from "./api/routes/myDataRoutes";
import userRoutes from "./api/routes/userRoutes";
import issuesRoutes from "./api/routes/issuesRoutes";
import uploadRoutes from "./api/routes/imageRoutes";
import fileRoutes from "./api/routes/fileUploadRoutes";
import dropdownRoutes from "./api/routes/dropdownRoutes";
import consentRoutes from "./api/routes/consentRoutes";
import { ErrorHandler } from "./utils/errorHandler";
import errorMiddleware from "./middlewares/error";
import projectRoutes from "./api/routes/myTaskRoutes/projectRoutes";
import taskRoutes from "./api/routes/myTaskRoutes/taskRoutes";
import activityRoutes from "./api/routes/myTaskRoutes/activityLogRoutes";

const app: Application = express();
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/data", myDataRoutes);
app.use("/api/v1/issues", issuesRoutes);
app.use("/api/v1/documents", issuesRoutes);
app.use("/api/v1/image", uploadRoutes);
app.use("/api/v1/file", fileRoutes);
app.use("/api/v1/dropdown", dropdownRoutes);
app.use("/api/v1/consents", consentRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/activity-logs", activityRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Working fine",
  });
});

// Handle unknown routes
app.all("*", (req, res, next) => {
  next(new ErrorHandler(404, "Page Not Found"));
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
