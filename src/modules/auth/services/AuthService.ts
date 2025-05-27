import { AppDataSource } from "../../../database/data-source";
import { User } from "../../user/models/User";
import { Repository } from "typeorm";
import { AppError } from "../../../util/AppError";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { config } from "../../../config/dotenv"
import { redis } from "../../../config/redisCLient"
import crypto from "crypto"
import { warn } from "console";

export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async verifyRefreshToken(token: string) {
    try {
      const payload = jwt.verify(token, config.JWT_SECRET_REFRESH as string) as any
      if (!payload || !payload.sub || !payload.jti) {
        throw new AppError("Erro na verificacao do token: Mal formatado!", 403)
      }

      return payload
    } catch (error) {
      throw new AppError("Credenciais inválidas", 403);
    }
  }

  async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user?.username || "",
      role: user.role
    }

    // TODO: token durations (15m, 7d) come from config file
    const token = jwt.sign(payload, config.JWT_SECRET as string, { expiresIn: "15min" })
    return token
  }

  async generateRefreshToken(userId: string, jti: string) {
    const payload = {
      sub: userId,
      jti: jti,
    }

    const refreshToken = jwt.sign(payload, config.JWT_SECRET_REFRESH as string, { expiresIn: "7d" })
    return refreshToken
  }

  async isTokenBlacklisted(payload: any) {
    const tokenInBlacklist = await redis.get(`bl:${payload.jti}`)
    return tokenInBlacklist
  }

  async addTokenToBlacklist(payload: Record<string, any>): Promise<void> {
    await redis.set(`bl:${payload.jti}`, '1', {
      EX: 60 * 60 * 24 * 7, // 7 days
    })
  }

  async loginUser(emailUser: string, password: string) {
    let isEmail = false;
    if (emailUser.includes("@")) {
      isEmail = true;
    }

    const user = await this.userRepository.findOne({
      where: [isEmail ? { email: emailUser } : { username: emailUser }],
    })

    if (!user) {
      throw new AppError("Usuário/Email ou senha inválidas.", 401);
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      throw new AppError("Usuário/Email ou senha inválidas.", 401);
    }

    const token = await this.generateToken(user)
    const newJti = crypto.randomUUID()
    const refreshToken = await this.generateRefreshToken(user.id, newJti)

    return {
      token, refreshToken, user: {
        id: user.id,
        role: user?.role,
        name: user?.name
      }
    }
  }
}
