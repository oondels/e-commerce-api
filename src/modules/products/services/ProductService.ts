import { AppDataSource } from "../../../database/data-source";
import { Repository } from "typeorm";
import { Product } from "../models/Product";
import { AppError } from "../../../util/AppError";

export class ProductService {
  private productRepository: Repository<Product>

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product)
  }

  async createProduct(data: Product) {
    const checkProduct = await this.productRepository.findOne({ where: { name: data.name } })
    if (checkProduct) {
      throw new AppError("Produto já cadastrado com este nome.", 400)
    }

    const product = this.productRepository.create(data)
    await this.productRepository.save(product)
    return product
  }

  async updateProductPrice(id: string, price: number) {
    const product = await this.productRepository.findOne({ where: { id } })
    if (!product) {
      throw new AppError("Não foi possível atualizar o valor do produto: Produto não encontrado!", 404)
    }

    product.price = price
    await this.productRepository.save(product)
    return product
  }

  async updateProductStock(id: string, stock: number) {
    const product = await this.productRepository.findOne({ where: { id } })
    if (!product) {
      throw new AppError("Não foi possível atualizar o estoque do produto: Produto não encontrado!", 404)
    }

    product.stock = stock
    await this.productRepository.save(product)
    return product
  }

  async updateProductInfo(id: string, data: Product) {
    const product = await this.productRepository.findOne({ where: { id } })
    if (!product) {
      throw new AppError("Não foi possível atualizar as informações do produto: Produto não encontrado!", 404)
    }

    Object.assign(product, data)
    await this.productRepository.save(product)
    return product
  }
}