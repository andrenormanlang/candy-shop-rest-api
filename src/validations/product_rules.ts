import { body } from "express-validator";

export const createProductRules = [
  body('name').isString().notEmpty().withMessage('Please provide a valid name'),
  body('description').isString().notEmpty().withMessage('Please provide a valid description'),
  body('images').notEmpty().withMessage('Please provide valid images'),
  body('stock_status').isString().notEmpty().withMessage('Please provide a valid stock status'),
	body('price').isInt({ min: 1}).withMessage('has to be at least 1'),
  body('stock_quantity').isInt({ min: 0}).withMessage('has to be at least 0'),
]