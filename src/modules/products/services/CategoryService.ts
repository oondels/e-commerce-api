import { AppDataSource } from "../../../database/data-source";
import { Repository, DataSource } from "typeorm";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { AppError } from "../../../util/AppError";

export class CategoryService {
  private categoryRepository: Repository<Category>
  private productRepository: Repository<Product>

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category)
    this.productRepository = AppDataSource.getRepository(Product)
  }

  async createCategory(data: Category) {
    const checkCategory = await this.categoryRepository.findOne({ where: { name: data.name } })
    if (checkCategory) {
      throw new AppError("Categoria já cadastrada com este nome.", 400)
    }

    const category = this.categoryRepository.create(data)

    await this.categoryRepository.save(category)
    return category
  }

  async updateCategory(id: string, data: Category) {
    const category = await this.categoryRepository.findOne({ where: { id } })
    if (!category) {
      throw new AppError("Não foi possível atualizar a categoria: Categoria não encontrada!", 404)
    }

    Object.assign(category, data)
    await this.categoryRepository.save(category)
    return category
  }
}