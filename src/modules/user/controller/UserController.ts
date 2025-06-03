import { Request, Response, NextFunction } from "express"
import { UserService } from "../services/UserService"
import { AuthService } from "../../auth/services/AuthService"
import { AppError } from "../../../util/AppError"

const userService = new UserService()

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body
    
      if (data.password !== data.confirmPassword) {
        throw new AppError("As senhas não coincidem.", 400)
      }

      const user = await userService.createUser(data)
      res.status(201).json({
        message: "Usuário cadastrado com sucesso",
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
        }
      })
    } catch (error) {
      next(error)
    }
  }
}