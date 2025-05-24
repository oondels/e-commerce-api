import Joi from "joi";

export interface CreateProductDto {
  name: string;
  description?: string;
  shortDescription?: string;
  categoryId: string;
  tags?: string[];
  stock: number;
  minimumStock?: number;
  maximumStock?: number;
  sku: string;
  price: number;
  promotionalPrice?: number;
  costPrice?: number;
  isActive: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  isOnSale?: boolean;
  images?: string[];
  userCreate: string;
}

export const productSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.empty": "Nome é obrigatório.",
    "any.required": "Nome é obrigatório.",
  }),
  description: Joi.string().optional(),
  shortDescription: Joi.string().optional(),
  categoryId: Joi.string().required().messages({
    "string.empty": "Categoria é obrigatória.",
    "any.required": "Categoria é obrigatória.",
  }),
  tags: Joi.array().items(Joi.string()).optional(),
  stock: Joi.number().integer().min(0).default(0),
  minimumStock: Joi.number().integer().min(0).optional(),
  maximumStock: Joi.number().integer().min(0).optional(),
  sku: Joi.string().max(100).required(),
  price: Joi.number().min(0).required(),
  promotionalPrice: Joi.number().min(0).optional(),
  costPrice: Joi.number().min(0).optional(),
  isActive: Joi.boolean().default(true),
  isFeatured: Joi.boolean().default(false),
  isNew: Joi.boolean().default(false),
  isTrending: Joi.boolean().default(false),
  isOnSale: Joi.boolean().default(false),
  images: Joi.array().items(Joi.string().uri()).optional(),
  userCreate: Joi.string().min(1).required().messages({
    "string.empty": "Usuário criador é obrigatório.",
    "any.required": "Usuário criador é obrigatório.",
  }),
});
