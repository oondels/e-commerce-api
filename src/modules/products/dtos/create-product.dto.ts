import Joi from "joi";

// Schema base para criação
export const productSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.empty": "Nome é obrigatório.",
    "any.required": "Nome é obrigatório.",
  }),
  description: Joi.string().optional(),
  stock: Joi.number().integer().min(0).default(0),
  minimumStock: Joi.number().integer().min(0).optional(),
  maximumStock: Joi.number().integer().min(0).optional(),
  sku: Joi.string().max(100).required(),
  price: Joi.number().min(0).required(),
  promotionalPrice: Joi.number().min(0).optional(),
  costPrice: Joi.number().min(0).optional(),
  isActive: Joi.boolean().default(true),
  images: Joi.array().items(Joi.string().uri()).optional(),
  userCreate: Joi.string().min(1).required().messages({
    "string.empty": "Usuário criador é obrigatório.",
    "any.required": "Usuário criador é obrigatório.",
  }),
});
