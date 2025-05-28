import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index
} from 'typeorm'
import {Order} from "../../orders/models/Order"

export type UserRole = 'user' | 'admin' | 'employee'

@Entity({ schema: 'auth', name: 'users' })
@Index(["email"])
@Index(["username"])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column({ nullable: true })
  username?: string

  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @Column({ type: 'varchar', default: 'user' })
  role!: UserRole

  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true })
  cpf?: string

  @Column({ nullable: true })
  addressLine1?: string

  @Column({ nullable: true })
  addressLine2?: string

  @Column({ nullable: true })
  city?: string

  @Column({ nullable: true })
  state?: string

  @Column({ nullable: true })
  postalCode?: string

  @Column({ nullable: true })
  country?: string

  @Column({ nullable: true })
  birth?: Date

  @Column({ nullable: true })
  profilePicture?: string

  @Column({ type: 'varchar', nullable: true })
  refreshToken?: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @OneToMany(() => Order, order => order.user)
  orders!: Order[]
}
