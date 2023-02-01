import { body } from "express-validator";

export const createProductRules = [
	body('price').isInt({ min: 1}).withMessage('has to be at least 1'),
  body('stock_quantity').isInt({ min: 0}).withMessage('has to be at least 0'),
]