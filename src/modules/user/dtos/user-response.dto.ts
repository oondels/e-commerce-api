import { User } from "../models/User";

export class UserResponseDTO {
  id!: string;
  name!: string;
  email!: string;
  username?: string;
  phone?: string;
  cpf?: string;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  birth?: string | Date;             // see note on date below
  profilePicture?: string;

  static fromEntity(u: User): UserResponseDTO {
    const dto = new UserResponseDTO();

    dto.id = u.id;
    dto.name = u.name;
    dto.username = u.username;
    dto.email = u.email;
    dto.phone = u.phone;
    dto.cpf = `*******${u.cpf?.slice(-4)}`; // Masking CPF
    dto.addressLine1 = u.addressLine1;
    dto.addressLine2 = u.addressLine2;
    dto.postalCode = u.postalCode;
    dto.city = u.city;
    dto.state = u.state;
    dto.country = u.country;
    dto.birth = u.birth ? new Date(u.birth) : undefined;
    dto.profilePicture = u.profilePicture;

    return dto;
  }
}