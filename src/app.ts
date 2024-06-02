import express from "express";

const app = express();

// ROUTES
app.get("/test", (req, res) => {
  res.json({ message: "Api Test Passed ✅" });
});

export default app;
