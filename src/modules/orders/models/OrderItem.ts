import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm"
import { Order } from "./Order"
import { Product } from "../../products/models/Product"

@Entity({ schema: "core", name: "order_items" })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => Order, order => order.items)
  order!: Order

  // Eager -> Load product info with each OrderItem
  @ManyToOne(() => Product, { eager: true })
  product!: Product

  @Column('int')
  quantity!: number

  @Column('decimal', { precision: 10, scale: 2 })
  priceAtPurchase!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @DeleteDateColumn()
  deletedAt!: Date
}
