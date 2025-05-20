import { config } from "../config/dotenv";
import { DataSource } from "typeorm";
import { Product } from "../modules/products/models/Product";
import { User } from "../modules/user/models/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: parseInt(config.DB_PORT),
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Product, User],
  subscribers: [],
  migrations: [],
})