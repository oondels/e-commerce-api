import Joi from "joi";

export interface CreateCategoryDto {
  name: string;
  description?: string;
  isActive?: boolean;
  userCreate: string;
}

export const categorySchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.empty": "Nome é obrigatório.",
    "any.required": "Nome é obrigatório.",
  }),
  description: Joi.string().optional(),
  isActive: Joi.boolean().default(true),
  userCreate: Joi.string().min(1).required().messages({
    "string.empty": "Usuário criador é obrigatório.",
    "any.required": "Usuário criador é obrigatório.",
  }),
});
