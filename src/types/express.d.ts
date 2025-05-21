import { Request } from "express";
import TokenPayload from "./auth"

declare global {
  namespace Express {
    interface User extends TokenPayload {}

    interface Request {
      user?: User;
    }
  }
}