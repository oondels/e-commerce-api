import { AppDataSource } from "../../../database/data-source"
import { Repository, DataSource } from "typeorm"
import { Order } from "../models/Order"
import { OrderItem } from "../models/OrderItem"
import { Product } from "../../products/models/Product"
import { User } from "../../user/models/User"
import { AppError } from "../../../util/AppError"
import logger from "../../../util/logger"

export interface CreateOrderDto {
  user: string
  items: any
}

export class OrderService {
  private readonly orderRepository: Repository<Order>
  private readonly orderItemRepository: Repository<OrderItem>
  private readonly userRepository: Repository<User>
  private readonly productRepository: Repository<Product>

  constructor(private dataSource: DataSource = AppDataSource) {
    this.orderRepository = AppDataSource.getRepository(Order)
    this.orderItemRepository = AppDataSource.getRepository(OrderItem)
    this.userRepository = AppDataSource.getRepository(User)
    this.productRepository = AppDataSource.getRepository(Product)
  }

  async createOrder(data: CreateOrderDto): Promise<Order> {
    return this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(User, { where: { id: data.user } })
      if (!user) throw new AppError("Usuário não encontrado.", 404)

      let itemsData: OrderItem[] = []
      let total = 0
      for (const item of data.items) {
        const product = await manager.findOne(Product, { where: { id: item.productId } })
        if (!product) {
          throw new AppError(`Produto ${item.productId} não encontrado!`)
        }

        if (product.stock < item.quantity) {
          throw new AppError("Quantidade disponível em stock insuficiente.")
        }

        if (item.quantity <= 0) {
          throw new AppError("Quantidade inválida para produto.", 400)
        }

        const orderItem = manager.create(OrderItem, {
          product,
          quantity: item.quantity,
          priceAtPurchase: product.price
        })

        total += product.price * item.quantity
        itemsData.push(orderItem)
      }

      const newOrder = manager.create(Order, {
        user,
        items: itemsData,
        total,
        status: 'pending'
      })

      try {
        await manager.save(newOrder)
        return newOrder;
      } catch (error: any) {
        logger.error("Order", `Error saving user (id: ${user.id}) order.`)
        throw new AppError("Erro ao realizar compra de produtos.", 500)
      }

    })
  }
}