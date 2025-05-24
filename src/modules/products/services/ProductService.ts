import { AppDataSource } from "../../../database/data-source";
import { Repository, DataSource } from "typeorm";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { AppError } from "../../../util/AppError";
import { CreateProductDto } from "../dtos/create-product.dto";

export class ProductService {
  private productRepository: Repository<Product>
  private categoryRepository: Repository<Category>

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product)
    this.categoryRepository = AppDataSource.getRepository(Category)
  }

  async createProduct(data: Product) {
    const checkProduct = await this.productRepository.findOne({ where: { name: data.name } })
    if (checkProduct) {
      throw new AppError("Produto já cadastrado com este nome.", 400)
    }

    const categoryId = data.categoryId as unknown as string
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } })
    if (!category) {
      throw new AppError("Categoria não encontrada. Registre uma nova categoria antes de continuar.", 404)
    }

    data.categoryId = category 
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