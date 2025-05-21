import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { isAdmin } from "../../middlewares/isAdmin";
import { Router, Request, Response, NextFunction } from "express"
import { OrderController } from "./controllers/OrderController";

export const orderRoute = Router()

// TODO: Subtract products stock after payment confirmation
orderRoute.post("/", isAuthenticated, OrderController.create)