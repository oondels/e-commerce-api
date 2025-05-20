import { AppDataSource } from "../../../database/data-source";
import { User } from "../models/User";
import { Repository } from "typeorm";
import { AppError } from "../../../util/AppError";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { config } from "../../../config/dotenv"

export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async loginUser(username: string, email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: [
        { email },
        { username: username.toLowerCase() }
      ]
    })

    if (!user) {
      throw new AppError("Usuário/Email ou senha inválidas.", 401);
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      throw new AppError("Usuário/Email ou senha inválidas.", 401);
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    }

    // TODO: token durations (15m, 7d) come from config file
    const token = jwt.sign(payload, config.JWT_SECRET as string, { expiresIn: "15min" })
    // const refreshToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" })

    return { token }
  }
}