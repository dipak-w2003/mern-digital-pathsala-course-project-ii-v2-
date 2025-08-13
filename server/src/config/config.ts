import { config } from "dotenv";
config();

export const envConfig = {
  portNumber: process.env.PORT_NUMBER,
  name: process.env.NAME || "Digital Pathsala P2",
  username: process.env.USERNAME || "username",
  password: process.env.PASSWORD || "password",
  database: {
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "digital-pathsala-learning",
  },

  // services
  serviceCloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRETA,
  },

  NodeMailer: {
    nodemailerGmail: process.env.NODEMAILER_GMAIL,
    nodemailerGmailAppPassword: process.env.NODEMAILER_GMAIL_APP_PASSWORD,
  },
  JWT_Generate: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  },
};
