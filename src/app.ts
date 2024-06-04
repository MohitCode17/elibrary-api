import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORT ROUTES
import userRoutes from "./routes/user.routes";

// ROUTES DECLARATION
app.use("/api/users", userRoutes);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
