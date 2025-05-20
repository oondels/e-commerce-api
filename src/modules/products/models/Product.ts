import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm"

@Entity({ schema: "core", name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column('text')
  name!: string

  @Column('text')
  description?: string

  @Column('int', { default: 0 })
  stock!: number

  @Column({ type: 'int', nullable: true })
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

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'jsonb', nullable: true })
  images?: string[];

  @Column('text')
  userCreate!: string

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date
}
