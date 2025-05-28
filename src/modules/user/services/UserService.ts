import { AppDataSource } from "../../../database/data-source";
import { User } from "../models/User";
import { Repository } from "typeorm";
import { AppError } from "../../../util/AppError";
import bcrypt from "bcrypt"
import { UserResponseDTO } from "../dtos/user-response.dto";

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

  async getUserById(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ["addressLine1", "addressLine2", "postalCode", "name", "username", "email", "phone", "cpf", "city", "state", "country", "birth", "profilePicture"]
    })
    if (!user) {
      throw new AppError("Usuário não encontrado. Entre em contato com o suporte para resolvermos esse problema o mais rápido possível!", 404)
    }

    return UserResponseDTO.fromEntity(user);
  }
}