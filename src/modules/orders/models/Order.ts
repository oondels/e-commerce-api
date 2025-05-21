import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm"
import { User } from "../../user/models/User"
import { OrderItem } from "./OrderItem"

export type OrderStatus = 'pending' | 'paid' | 'cancelled'

@Entity({ schema: "core", name: "orders" })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => User, user => user.orders)
  user!: User

  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  items!: OrderItem[]

  @Column({ type: 'varchar', default: 'pending' })
  status!: OrderStatus

  @Column('decimal', { precision: 10, scale: 2 })
  total!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @DeleteDateColumn()
  deletedAt!: Date
}

