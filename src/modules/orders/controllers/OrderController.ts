import { Request, Response, NextFunction } from "express"
import { AppError } from "../../../util/AppError";
import { OrderService } from "../services/OrderService";
import { OrderStatus } from "../models/Order";

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

  static async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id

      if (!userId) {
        res.status(400).json({ messae: "Sessão expirada! Faça login novamente." })
        return
      }

      const orders = await orderService.getAllOrders(userId)
      const filtredOrders = orders.map(order => ({
        id: order.id,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        items: order.items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          priceAtPurchase: item.priceAtPurchase
        }))
      }))

      res.status(200).json(filtredOrders)
    } catch (error) {
      next(error)
    }
  }

  static async getUserOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id

      if (!userId) {
        res.status(400).json({ messae: "Sessão expirada! Faça login novamente." })
        return
      }
      const orders = await orderService.getUserOrders(userId)

      const filtredOrders = orders.map(order => ({
        id: order.id,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        items: order.items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          priceAtPurchase: item.priceAtPurchase
        }))
      }))

      res.status(200).json(filtredOrders)
    } catch (error) {
      next(error)
    }
  }

  static async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const order = await orderService.getOrderById(id)

      const filtredOrder = {
        id: order.id,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        items: order.items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          priceAtPurchase: item.priceAtPurchase
        }))
      }

      res.status(200).json(filtredOrder)
    } catch (error) {
      next(error)
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { status } = req.body

      if (!id || typeof id !== 'string') {
        res.status(400).json({ message: "Id do produto não identificado." })
        return
      }

      const validStatuses: OrderStatus[] = ['pending', 'paid', 'cancelled']
      if (!validStatuses.includes(status as OrderStatus)) {
        res.status(400).json({ message: "Invalid order status" })
        return
      }

      await orderService.updateOrderStatus(id, status)

      res.status(200).json({ message: "Status do pedido atualizado com sucesso!" })
    }
    catch (error) {
      next(error)
    }
  }

  static async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      if (!id || typeof id !== 'string') {
        res.status(400).json({ message: "Id do produto não identificado." })
        return
      }

      const order = await orderService.cancelOrder(id)

      res.status(200).json({ message: "Pedido cancelado com sucesso!" })
    } catch (error) {
      next(error)
    }
  }
}