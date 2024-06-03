import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

// ROUTES
app.get("/test", (req, res) => {
  res.json({ message: "Api Test Passed ✅" });
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
