import { body } from "express-validator";

export const createOrderRules = [
    body('customer_email').isEmail().withMessage('This is an e-mail field'), 
    body('customer_postcode').isString().isLength({ max: 6 }).withMessage('This postcode is a max. of 6 characters'),
    body('order_total').isInt({ min: 1 }).withMessage('Your order should contain at least 1 product'),
    body('product_id').isInt({ min: 1 }).withMessage('The product_id should be at least 1'),
    body('qty').isInt({ min: 1 }).withMessage('The product in items should be at least 1'),
    body('item_price').isInt({ min: 1 }).withMessage('The price of your product should be at least 1'),
    body('item_total').isInt({ min: 1 }).withMessage('The total of products in items should be at least 1'),
  ]