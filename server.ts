import app from "./src/app";
import { config } from "./src/config/config";
import { connectDB } from "./src/config/db";

const startServer = async () => {
  // CONNECT DATABASE
  await connectDB();

  const port = config.port || 8001;

  app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
  });
};

startServer();
