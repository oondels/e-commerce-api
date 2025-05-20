import { Router } from "express"
import { UserController } from "./controller/UserController"
import { userSchema } from "./dtos/create-user.dto"
import { validateRequest } from "../../middlewares/validateRequest"

export const userRoute = Router()

userRoute.post("/register", validateRequest(userSchema), UserController.create)