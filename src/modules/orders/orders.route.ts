import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { isAdmin } from "../../middlewares/isAdmin";
import { Router, Request, Response, NextFunction } from "express"
import { OrderController } from "./controllers/OrderController";

export const orderRoute = Router()

// Admin
// TODO: Continue here
orderRoute.get("/admin", isAdmin, OrderController.getAllOrders)
orderRoute.put("/:id/status", isAdmin, OrderController.updateStatus)

// TODO: Subtract products stock after payment confirmation
orderRoute.post("/", isAuthenticated, OrderController.create)

// User
orderRoute.get("/", isAuthenticated, OrderController.getUserOrders)
orderRoute.get("/:id", isAuthenticated, OrderController.getOrder)
orderRoute.put("/:id/cancel", isAuthenticated, OrderController.cancel)

