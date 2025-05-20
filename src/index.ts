import express, { Request, Response, NextFunction } from "express"

const app = express()
const port = 2321
 
app.use(express.json())

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Ecommerce api running!" })
})

app.listen(port, () => {
  console.log("App running on port: ", port);
})