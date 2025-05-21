import { AppDataSource } from "../../../database/data-source"
import { Repository, DataSource } from "typeorm"
import { Order } from "../models/Order"
import { OrderItem } from "../models/OrderItem"
import { Product } from "../../products/models/Product"
import { User } from "../../user/models/User"
import { AppError } from "../../../util/AppError"
import logger from "../../../util/logger"
import { OrderStatus } from "../models/Order"

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

  async getAllOrders(userId: string) {
    // const user = await this.userRepository.findOne({ where: { id: userId } })
    // if (!user) throw new AppError("Usuário não encontrado ou inativo.", 404)
      
    // if (user.role !== 'admin') throw new AppError("Você não tem permissões para acessar esta funcionalidade.", 403)

    const orders = await this.orderRepository.find({
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' }
    })

    return orders
  }

  async getUserOrders(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) throw new AppError("Usuário não encontrado ou inativo.", 404)

    const orders = await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product']
    })

    return orders
  }

  async getOrderById(orderId: string) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items', 'items.product']
    })
    if (!order) throw new AppError("Pedido não encontrado!", 404)

    return order
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    const order = await this.getOrderById(orderId)

    order.status = status
    try {
      await this.orderRepository.save(order)
    } catch (error) {
      logger.error("Order", "Erro ao atualizar status do pedido: " + error)
      throw new AppError(`Erro ao atualizar status do pedido ${orderId}`, 500)
    }
  }

  async cancelOrder(id: string) {
    const user = this.userRepository.findOne({ where: { id } })
    if (!user) throw new AppError("Usuário não encontrado ou inativo.", 404)

    const order = await this.getOrderById(id)
    // TODO: Futuramente implementar lógica de Refund
    if (order.status !== 'pending') throw new AppError("Não é possível cancelar este pedido!")

    order.status = 'cancelled'
    try {
      await this.orderRepository.save(order)
    } catch (error) {
      throw new AppError(`Erro cancelar pedido ${id}`, 500)
    }
  }
}