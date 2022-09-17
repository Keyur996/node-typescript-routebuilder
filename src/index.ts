import app from "./app";
import { config } from "dotenv";
import path from "path";
import { dbConnect } from "./utils/dbConnect";

config({ path: path.join(process.cwd() + "/.env") });

const start = async () => {
  const port = process.env.PORT || 3001;
  await dbConnect();
  const server = app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
  });

  process.on("uncaughtException", (err) => {
    console.log(
      "Uncaught Exception occured !!. shutting down server gracefully!!"
    );
    console.log("Error", err);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on("SIGTERM", (err) => {
    console.log("SIGTERM occured !!. shutting down server gracefully!!");
    console.log("Error", err);
    server.close(() => {
      process.exit(1);
    });
  });
};

start();
