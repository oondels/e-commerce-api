import { AppDataSource } from "../../../database/data-source";
import { User } from "../models/User";
import { Repository } from "typeorm";
import { AppError } from "../../../util/AppError";
import bcrypt from "bcrypt"

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(data: User) {
    const checkUser = await this.userRepository.findOne({ where: { email: data.email } });
    if (checkUser) {
      throw new AppError("Este email já esta em uso.", 400);
    }

    if (data.role !== 'user') {
      throw new AppError("Tipo de usuário inválido ou permissões insuficientes.", 403);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const user = this.userRepository.create(data);

    try {
      await this.userRepository.save(user);
      return {
        id: user.id,
        name: user.name,
        role: user.role,
      };
    } catch (error) {
      console.error("Erro ao criar usuário: ", error);
      throw new AppError("Erro ao criar usuário");
    }
  }
}