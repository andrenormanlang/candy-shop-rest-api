import { body } from "express-validator";

export const createProductRules = [
  body('name').isString().notEmpty().withMessage('Please provide a valid product name').bail().isLength({ min: 2 }).withMessage("your product name is too short"),
  body('description').isString().notEmpty().withMessage('Please provide a valid product description').isLength({ min: 5 }).withMessage("your product description is too short"),
  body('images').notEmpty().withMessage('Please provide valid images'),
  body('stock_status').isString().notEmpty().withMessage('Please provide a valid stock status'),
	body('price').isInt({ min: 1}).withMessage('price should be at least 1kr'),
  body('stock_quantity').optional({ nullable: true }).isInt({ min: 0}).withMessage('Stock quantity has to be at least 0'),
]