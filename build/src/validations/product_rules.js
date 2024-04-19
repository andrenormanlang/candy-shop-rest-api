"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductRules = void 0;
const express_validator_1 = require("express-validator");
exports.createProductRules = [
    (0, express_validator_1.body)('name').isString().notEmpty().withMessage('Please provide a valid product name').bail().isLength({ min: 2 }).withMessage("your product name is too short"),
    (0, express_validator_1.body)('description').isString().notEmpty().withMessage('Please provide a valid product description').isLength({ min: 5 }).withMessage("your product description is too short"),
    (0, express_validator_1.body)('images').notEmpty().withMessage('Please provide valid images'),
    (0, express_validator_1.body)('stock_status').isString().notEmpty().withMessage('Please provide a valid stock status'),
    (0, express_validator_1.body)('price').isInt({ min: 1 }).withMessage('price should be at least 1kr'),
    (0, express_validator_1.body)('stock_quantity').optional({ nullable: true }).isInt({ min: 0 }).withMessage('Stock quantity has to be at least 0'),
];
