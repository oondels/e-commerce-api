import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm"
import { Product } from "./Product"

@Entity({ schema: "core", name: "categories" })
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column('text')
  name!: string

  @Column('text', { nullable: true })
  description?: string

  @Column({ default: true })
  isActive!: boolean

  @Column('text')
  userCreate!: string

  @DeleteDateColumn()
  deletedAt?: Date

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date

  @OneToMany(() => Product, (product) => product.categoryId)
  products!: Product[]
}