import app from "./src/app";

const startServer = () => {
  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
  });
};

startServer();
