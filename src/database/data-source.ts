import { config } from "../config/dotenv";
import { DataSource } from "typeorm";
import { Product } from "../modules/products/models/Product";
import { User } from "../modules/user/models/User";
import { Order } from "../modules/orders/models/Order";
import { OrderItem } from "../modules/orders/models/OrderItem";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: parseInt(config.DB_PORT),
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development',
  logging: false,
  entities: [Product, User, Order, OrderItem],
  subscribers: [],
  migrations: [],
})