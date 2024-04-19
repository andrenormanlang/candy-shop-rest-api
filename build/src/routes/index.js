"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = __importDefault(require("./orders"));
const products_1 = __importDefault(require("./products"));
// instantiate a new router
const router = express_1.default.Router();
/**
 * GET /
 */
router.get('/', (req, res) => {
    res.send({
        message: "I AM API, BEEP BOOP",
    });
});
/**
 * [EXAMPLE] /resource
 */
// router.use('/resource', resource)
/**
 * /products
 */
router.use('/products', products_1.default);
/**
 * /orders
 */
router.use('/orders', orders_1.default);
exports.default = router;
