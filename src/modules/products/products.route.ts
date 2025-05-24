import { Router, Request, Response, NextFunction } from "express"
import { validateRequest } from "../../middlewares/validateRequest";
import { editProductSchema } from "./dtos/edit-product-info.dto";
import { productSchema } from "./dtos/create-product.dto";
import { ProductController } from "./controller/ProductController";
import { CategoryController } from "./controller/CategoryController";
import { categorySchema } from "./dtos/create-category.dto";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { isAdmin } from "../../middlewares/isAdmin";

export const productRoute = Router()

productRoute.get("/", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Ecommerce api running!" })
})

productRoute.post("/", validateRequest(productSchema), ProductController.create)

productRoute.post("/categories/", validateRequest(categorySchema), CategoryController.create)

productRoute.put("/:id", validateRequest(editProductSchema), ProductController.updateInfo)
productRoute.put("/:id/price", ProductController.updatePrice)
productRoute.put("/:id/stock", ProductController.updateStock)