import { Request, Response, NextFunction } from "express"
import { AuthService } from "../services/AuthService"
import crypto from "crypto"
import { AppError } from "../../../util/AppError"

const authService = new AuthService()

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const { emailUser, password } = req.body

    if (!password || !emailUser) {
      res.status(400).json({ message: "Todos os campos são obrigatórios." })
      return
    }

    const { token, refreshToken, user } = await authService.loginUser(emailUser, password)

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 900000
    })
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7
    })

    res.status(200).json({ message: "Login realizado com sucesso.", token })
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies

    const payload = await authService.verifyRefreshToken(refreshToken)
    // Add the token to the blacklist
    await authService.addTokenToBlacklist(payload)

    res.clearCookie("token")
    res.clearCookie("refreshToken")

    res.status(200).json({ message: "Logout realizado com sucesso." })
  }


  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
      res.status(403).json({ message: "Credenciais inválidas." })
      return
    }

    try {
      const payload = await authService.verifyRefreshToken(refreshToken)

      const isTokenBlacklisted = await authService.isTokenBlacklisted(payload)
      if (isTokenBlacklisted) {
        res.status(403).json({ message: "Credenciais inválidas." })
        return
      }

      // Add the token to the blacklist
      await authService.addTokenToBlacklist(payload)
      // Generate a new refresh token and access token
      const newJti = crypto.randomUUID()
      const newRefreshToken = await authService.generateRefreshToken(payload.sub, newJti)
      const newToken = await authService.generateToken(payload)

      res.cookie("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 900000
      })

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7
      })

      res.status(200).json({ message: "Login atualizado com sucesso." })
    } catch (error) {
      next(error)
    }
  }
}
