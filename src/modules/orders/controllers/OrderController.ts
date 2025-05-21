import { Request, Response, NextFunction } from "express"
import { AppError } from "../../../util/AppError";
import { OrderService } from "../services/OrderService";

const orderService = new OrderService()
export class OrderController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body

      const order = await orderService.createOrder(data)
      res.status(201).json({
        message: "Pedido postado com sucesso!",
        order: {
          id: order.id,
          status: order.status,
          total: order.total,
          createdAt: order.createdAt,
          items: order.items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase
          }))
        }
      })
    } catch (error) {
      next(error)
    }
  }
}