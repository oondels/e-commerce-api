import express, { Request, Response, NextFunction } from "express"
import { AppDataSource } from "./database/data-source"
import { AppError } from "./util/AppError";
import { productRoute } from "./modules/products/products.route";
import { userRoute } from "./modules/user/users.route";
import { authRoute } from "./modules/auth/auth.route";
import { orderRoute } from "./modules/orders/orders.route";
import cookieParser from "cookie-parser"
import logger from "./util/logger"
import { connectRedis } from "./config/redisCLient"
import cors from "cors"

AppDataSource.initialize()
  .then(() => {
    logger.info("Database", "Database connected successfully!");

    // Initialize Redis connection
    connectRedis()
  }).catch(error => {
    logger.error("Database", "Error connecting to database: " + error);
  })

const app = express()
const port = 2321

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use("/api/products/", productRoute)
app.use("/api/users/", userRoute)
app.use("/api/auth/", authRoute)
app.use("/api/orders/", orderRoute)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Ecommerce api running!" })
})

app.listen(port, () => {
  logger.info("Server", `Server running on port ${port}`)
})

// Error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message })
    return
  }

  // Unexpected Errors
  console.error(`Erro no metodo ${req.method} na rota ${req.originalUrl}:`);

  res.status(500).json({
    message: "Erro interno no servidor. Contate a equipe de suporte.",
    error: process.env.NODE_ENV === "development" ? error.message : undefined
  });
})
