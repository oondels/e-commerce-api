import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm"
import { Category } from "./Category"

// TODO: Add a field to 'Related Products' to store the relationship with the product
// TODO: Add a filed to 'Product Variants'
@Entity({ schema: "core", name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column('text')
  name!: string

  @Column('text', { nullable: true })
  description?: string

  @Column('text', { nullable: true })
  shortDescription?: string

  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  categoryId!: Category

  @Column('jsonb', { nullable: true })
  tags?: string[]

  @Column('int', { default: 0 })
  stock!: number

  @Column({ type: 'int', nullable: true, default: 0 })
  minimumStock?: number;

  @Column({ type: 'int', nullable: true })
  maximumStock?: number;

  @Column({ length: 100, unique: true })
  sku!: string; // -> SKU (Stock Keeping Unit)

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  promotionalPrice!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  costPrice!: number;

  @Column({ type: 'jsonb', nullable: true })
  images?: string[];

  @Column('text')
  userCreate!: string

  @Column({ default: true })
  isActive!: boolean;

  @Column('boolean', { default: false })
  isFeatured!: boolean

  @Column('boolean', { default: false })
  isNew!: boolean

  @Column('boolean', { default: false })
  isTrending!: boolean

  @Column('boolean', { default: false })
  isOnSale!: boolean

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date
}
