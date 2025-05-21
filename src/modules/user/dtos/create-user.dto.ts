import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.empty": "Nome é obrigatório.",
    "any.required": "Nome é obrigatório.",
  }),

  username: Joi.string().optional(),

  email: Joi.string().email().required().messages({
    "string.email": "Email inválido.",
    "any.required": "Email é obrigatório.",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "A senha deve ter no mínimo 6 caracteres.",
    "any.required": "Senha é obrigatória.",
  }),

  role: Joi.string().valid("user", "admin", "employee").default("user"),

  phone: Joi.string().optional(),
  cpf: Joi.string().optional(),

  addressLine1: Joi.string().optional(),
  addressLine2: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  postalCode: Joi.string().optional(),
  country: Joi.string().optional(),

  refreshToken: Joi.string().optional()
});
