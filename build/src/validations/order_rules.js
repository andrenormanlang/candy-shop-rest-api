"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderRules = void 0;
const express_validator_1 = require("express-validator");
exports.createOrderRules = [
    (0, express_validator_1.body)('customer_first_name').isString().notEmpty().withMessage('Please provide a valid first name').bail().isLength({ min: 2 }).withMessage("your first name is too short"),
    (0, express_validator_1.body)('customer_last_name').isString().notEmpty().withMessage('Please provide a valid last name').bail().isLength({ min: 2 }).withMessage("your last name is too short"),
    (0, express_validator_1.body)('customer_address').isString().notEmpty().withMessage('Please provide a valid address').bail().isLength({ min: 5 }).withMessage("your address is too short"),
    (0, express_validator_1.body)('customer_city').isString().notEmpty().withMessage('Please provide a valid city'),
    (0, express_validator_1.body)('customer_email').isEmail().withMessage('This is an e-mail field'),
    (0, express_validator_1.body)('customer_postcode').isString().isLength({ max: 6 }).withMessage('This postcode is a max. of 6 characters'),
    (0, express_validator_1.body)('order_total').isInt({ min: 1 }).withMessage('Your order should contain at least 1 product'),
    (0, express_validator_1.body)('order_items').isLength({ min: 1 }).bail().withMessage("Your basket is empty please order at least 1 item"),
    (0, express_validator_1.body)('order_items.*.product_id').isInt({ min: 1 }).bail().withMessage("product not found"),
    (0, express_validator_1.body)('order_items.*.qty').isInt({ min: 1 }).withMessage('Product out of stock'),
    (0, express_validator_1.body)('order_items.*.item_price').isInt({ min: 1 }).withMessage('The price of your product should be at least 1'),
    (0, express_validator_1.body)('order_items.*.item_total').isInt({ min: 1 }).withMessage('The total of products in items should be at least 1'),
];
