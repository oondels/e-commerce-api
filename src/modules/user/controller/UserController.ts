import { Request, Response, NextFunction } from "express"
import { UserService } from "../services/UserService"
import { AuthService } from "../services/AuthService"

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

  static async login(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body

    if (!password || (!email && !username)) {
      res.status(400).json({ message: "Todos os campos são obrigatórios." })
      return
    }

    const { token } = await authService.loginUser(username, email, password)

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 900000
    })
    res.status(200).json({ message: "Login realizado com sucesso." })
  }
}