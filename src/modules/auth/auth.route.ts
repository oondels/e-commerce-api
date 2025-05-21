import { Router } from "express"
import { AuthController } from "./controller/AuthController"
import { isAuthenticated } from "../../middlewares/isAuthenticated"

export const authRoute = Router()

authRoute.post("/login", AuthController.login)
authRoute.post("/refreshToken", isAuthenticated, AuthController.refreshToken)
authRoute.post("/logout", isAuthenticated, AuthController.logout)