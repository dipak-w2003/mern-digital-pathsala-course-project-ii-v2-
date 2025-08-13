import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
import { config } from "dotenv";
// use this incase of .env / database related error if it's linked
config();
const sequelize = new Sequelize({
  database: envConfig.database.database,
  username: envConfig.database.username,
  password: envConfig.database.password,
  host: envConfig.database.host,
  dialect: "mysql",
  port: Number(envConfig.database.port),
  models: [__dirname + "/models"],
});

console.log("connection");
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.log("Syncing error :: ", error);
  });
export default sequelize;
