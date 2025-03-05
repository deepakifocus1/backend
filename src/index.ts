import { dbConfig, envConfig } from "./config/index";
import app from "./app";

// Connect to the database
dbConfig();

//handle uncought Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down server because of uncaughtException");
  process.exit(1);
});

//unhandled promise rejection
process.on("unhandledRejection", (err: Error) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down server because of unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});

const server = app.listen(envConfig.port, () =>
  console.log(`Server running on port ${envConfig.port}`)
);
