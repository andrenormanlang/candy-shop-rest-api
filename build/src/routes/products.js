"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Handle all / products routes */
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product_controller");
const product_rules_1 = require("../validations/product_rules");
const router = express_1.default.Router();
/**
 * GET /products
 */
router.get('/', product_controller_1.index);
/**
 * GET /products/:productId
 */
router.get('/:productId', product_controller_1.show);
/**
 * POST /product
 */
router.post('/', product_rules_1.createProductRules, product_controller_1.store);
/**
 * POST /many products
 */
router.post('/bulk', product_controller_1.storeMany);
/**
 * UPDATE /product
 */
router.put('/:productId', product_controller_1.update);
/**
 * DELETE /product
 */
router.delete('/:productId', product_controller_1.destroy);
exports.default = router;
