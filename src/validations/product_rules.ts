import { body } from "express-validator";

export const createProductRules = [
  body('name').isString().exists().withMessage('Please provide a valid name'),
  body('description').isString().exists().withMessage('Please provide a valid description'),
  body('images').isJSON().isObject().exists().withMessage('Please provide valid image'),
  body('stock_status').isString().exists().withMessage('Please provide a valid stock status'),
	body('price').isInt({ min: 1}).withMessage('has to be at least 1'),
  body('stock_quantity').isInt({ min: 0}).withMessage('has to be at least 0'),
]