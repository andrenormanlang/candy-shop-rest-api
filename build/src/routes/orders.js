"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Handle all / order routes */
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order_controller");
const order_rules_1 = require("../validations/order_rules");
const router = express_1.default.Router();
/**
 * GET /orders
 */
router.get("/", order_controller_1.index);
/**
 * GET /orders/:orderId
 */
router.get("/:orderId", order_controller_1.show);
/**
 * POST /orders
 */
router.post('/', order_rules_1.createOrderRules, order_controller_1.store);
/**
 * UPDATE /order
 */
router.put('/:orderId', order_controller_1.update);
/**
 * DELETE /product
 */
router.delete('/:orderId', order_controller_1.destroy);
exports.default = router;
