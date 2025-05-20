import Joi from "joi";

export const editProductSchema = Joi.object({
  name: Joi.string().min(1).optional(),
  description: Joi.string().optional(),
  minimumStock: Joi.number().integer().min(0).optional(),
  maximumStock: Joi.number().integer().min(0).optional(),
  costPrice: Joi.number().min(0).optional(),
  isActive: Joi.boolean().default(true).optional(),
  images: Joi.array().items(Joi.string().uri()).optional(),
});
