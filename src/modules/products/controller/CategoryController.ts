import { CategoryService } from "../services/CategoryService";
import { Request, Response, NextFunction } from "express"

const categoryService = new CategoryService()
export class CategoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body
      const category = await categoryService.createCategory(data)

      res.status(201).json({ message: "Categoria criada com sucesso", category })
    } catch (error) {
      next(error)
    }
  }
}
