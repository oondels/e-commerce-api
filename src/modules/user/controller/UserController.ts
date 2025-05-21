import { Request, Response, NextFunction } from "express"
import { UserService } from "../services/UserService"
import { AuthService } from "../../auth/services/AuthService"
import { AppError } from "../../../util/AppError"

const userService = new UserService()
const authService = new AuthService()

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body

      const user = await userService.createUser(data)
      res.status(201).json({
        message: "Usuário criado com sucesso",
        user: {
          name: user.name,
          email: user.email,
        }
      })
    } catch (error) {
      next(error)
    }
  }
}