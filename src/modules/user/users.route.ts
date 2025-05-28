import { Router } from "express"
import { UserController } from "./controller/UserController"
import { userSchema } from "./dtos/create-user.dto"
import { validateRequest } from "../../middlewares/validateRequest"
import { isAuthenticated } from "../../middlewares/isAuthenticated"

export const userRoute = Router()

userRoute.post("/register", validateRequest(userSchema), UserController.create)

userRoute.get("/:id", isAuthenticated, UserController.getPersonalData)