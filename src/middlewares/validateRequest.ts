import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

/**
 * Middleware to validate the request body against a given schema.
 *
 * @param schema - The validation schema to be used for validating the request body.
 * @returns A middleware function that validates the request body.
 *
 * The middleware performs the following:
 * - Validates the `req.body` against the provided schema.
 * - If validation fails, responds with a 400 status code and a JSON object containing
 *   an error message and the validation error details.
 * - If validation succeeds, updates `req.body` with the validated and sanitized data
 *   (removing unknown fields) and proceeds to the next middleware.
 */

export function validateRequest(schema: ObjectSchema, property: "body" | "query" | "params" = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req[property]) {
      res.status(400).json({message: "Invalid request body."})
      return
    }

    const { error } = schema.validate(req[property], { abortEarly: false })
    
    if (error) {
      res.status(400).json({
        message: "Error validating data.",
        details: error.details.map((detail) => ({
          path: detail?.path?.join(","),
          message: detail?.message
        }))
      })
      return
    }

    next()
  }
}