// server.ts
console.log("Loading app...");
import app from "./src/app";
import { envConfig } from "./src/config/config";
import connection from "./src/database/connection";
console.log("Starting server...");
function startServer() {
  const port = envConfig.portNumber;
  app.listen(port, () => {
    console.log(`🚀 Server is running http://localhost:${port}`);
  });
}
console.log(connection);

startServer();
