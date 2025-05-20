import dotenv from "dotenv"
import path from "path"
const development = process.env.NODE_ENV === 'development'
const envFile = development ? ".env" : ".env.production";
dotenv.config({ path: path.resolve(__dirname, "../../", envFile) });

export const config = {
  API_PORT: process.env.API_PORT || "",
  DB_HOST: process.env.DB_HOST,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT || "5432",
  DB_USER: process.env.DB_USER,
  JWT_SECRET: process.env.JWT_SECRET || "",
}