import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { AppError } from "../util/AppError"
import { config } from "../config/dotenv"

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token

  if (!token) {
    throw new AppError("Acesso negado! Você não possui permissão para acessar essa funcionalidade.", 401)
  }

  jwt.verify(token, config.JWT_SECRET as string, (error: any, decoded: any) => {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Acesso expirado. Faça login novamente.", 401)
    }
    if (error) {
      throw new AppError("Acesso negado! Você não possui permissão para acessar essa funcionalidade. Entre em contato com o suporte se for um erro.", 401)
    }

    if (!decoded) {
      throw new AppError("Acesso negado! Você não possui permissão para acessar essa funcionalidade.", 401)
    }

    // TODO: Correct error
    req.user = decoded
    next()
  })
}