import { ProductService } from "../services/ProductService";
import { Request, Response, NextFunction } from "express"

const productService = new ProductService()
export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body
      const product = await productService.createProduct(data)

      res.status(201).json({ message: "Produto criado com sucesso", product })
    } catch (error) {
      next(error)
    }
  }

  static async updatePrice(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { price } = req.body

      const product = await productService.updateProductPrice(id, price)

      res.status(200).json({ message: "Preço do produto atualizado com sucesso!", product })
    } catch (error) {
      next(error)
    }
  }

  static async updateStock(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { stock } = req.body

      const product = await productService.updateProductStock(id, stock)

      res.status(200).json({ message: "Estoque do produto atualizado com sucesso!", product })
    } catch (error) {
      next(error)
    }
  }

  static async updateInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const data = req.body

      const product = await productService.updateProductInfo(id, data)

      res.status(200).json({ message: "Produto atualizado com sucesso!", product })
    } catch (error) {
      next(error)
    }
  }
}
