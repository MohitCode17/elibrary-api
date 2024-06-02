import app from "./src/app";
import { config } from "./src/config/config";

const startServer = () => {
  const port = config.port || 8001;

  app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
  });
};

startServer();
