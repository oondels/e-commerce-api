import express, { Request, Response, NextFunction } from "express"
import { AppDataSource } from "./database/data-source"
import { AppError } from "./util/AppError";
import { productRoute } from "./modules/products/products.route";
import { userRoute } from "./modules/user/users.route";
import { authRoute } from "./modules/user/auth.route";
import cookieParser from "cookie-parser"
// import cors from "cors"

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");

  }).catch(error => {
    console.error("Error connecting to database.", error);
  })

const app = express()
const port = 2321

// app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/products/", productRoute)
app.use("/api/users/", userRoute)
app.use("/api/auth/", authRoute)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Ecommerce api running!" })
})

app.listen(port, () => {
  console.log("App running on port: ", port);
})

// Error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message })
    return
  }

  // Unexpected Errors
  console.error(`Erro no metodo ${req.method} na rota ${req.originalUrl}:`, error);
  res.status(500).json({
    message: "Erro interno no servidor. Contate a equipe de suporte.",
    error: process.env.NODE_ENV === "development" ? error.message : undefined
  });
})