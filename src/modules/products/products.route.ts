import { Router } from "express"
import { validateRequest } from "../../middlewares/validateRequest";
import { editProductSchema } from "./dtos/edit-product-info.dto";
import { productSchema } from "./dtos/create-product.dto";
import { ProductController } from "./controller/ProductController";

export const productRoute = Router()

productRoute.post("/", validateRequest(productSchema), ProductController.create)


productRoute.put("/:id", validateRequest(editProductSchema), ProductController.updateInfo)
productRoute.put("/:id/price", ProductController.updatePrice)
productRoute.put("/:id/stock", ProductController.updateStock)