import express, { Request, Response, NextFunction } from "express"
import { AppDataSource } from "./database/data-source"
import { productRoute } from "./modules/products/products.route";
import { AppError } from "./util/AppError";
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
app.use("/api/products/", productRoute)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Ecommerce api running!" })
})

app.listen(port, () => {
  console.log("App running on port: ", port);
})

// Error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Erro no metodo ${req.method} na rota ${req.originalUrl}:`, error);
  let message = "Erro interno no servidor. Contate a equipe de suporte."

  if (error instanceof AppError) {
    message = error.message
    res.status(error.statusCode).json({ message })
    return
  }

  // Unexpected Errors
  res.status(500).json({
    message: message,
    error: process.env.NODE_ENV === "development" ? error.message : undefined
  });
})