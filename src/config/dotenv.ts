import dotenv from "dotenv"
import path from "path"
import Joi from "joi";
const development = process.env.NODE_ENV === 'development'
const envFile = development ? ".env" : ".env.production";
dotenv.config({ path: path.resolve(__dirname, "../../", envFile) });

const envVariablesSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.string().default("5432"),
  DB_USER: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.string().default("6379"),
  REDIS_PASSWORD: Joi.string().default(""),
  JWT_SECRET_REFRESH: Joi.string().default(""),
});

export const config = {
  DB_HOST: process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT || "5432",
  DB_USER: process.env.DB_USER,
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT || "6379",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH
}

const { error } = envVariablesSchema.validate(config, { abortEarly: false })
if (error) {
  console.error("Environment variables validation error:", error.details);
  throw new Error("Invalid environment variables");
}