import { Router } from "express"
import { UserController } from "./controller/UserController"

export const authRoute = Router()

authRoute.post("/login", UserController.login)