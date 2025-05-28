import { Request, Response, NextFunction } from "express"
import { UserService } from "../services/UserService"
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

  static async getPersonalData(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedUser = req.user
      const { id } = req.params      

      if (loggedUser?.id !== id && loggedUser?.role !== 'admin') {
        throw new AppError("Você não possui acesso a essas informações.", 403);
      }

      const user = await userService.getUserById(id)

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}