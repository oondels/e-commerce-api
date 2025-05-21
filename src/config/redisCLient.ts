import { createClient } from "redis";
import { config } from "./dotenv"
import logger from "../util/logger"

export const redis = createClient({
  socket: {
    host: config.REDIS_HOST,
    port: Number(config.REDIS_PORT),
  },
  password: config.REDIS_PASSWORD,
})

redis.on("error", (err) => {
  logger.error("Redis Client", "Error connecting to Redis: " + err);
});

redis.on("connect", () => {
  logger.info("Redis Client", "Successfully connected to Redis!");
})

export async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
}
