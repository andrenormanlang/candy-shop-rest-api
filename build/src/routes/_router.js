"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Router Template
 */
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order_controller");
const router = express_1.default.Router();
/**
 * GET /resource
 */
router.get("/", order_controller_1.index);
/**
 * GET /resource/:resourceId
 */
router.get("/:resourceId", order_controller_1.show);
/**
 * POST /resource
 */
router.post("/", [], order_controller_1.store);
/**
 * PATCH /resource/:resourceId
 */
router.patch("/:resourceId", [], order_controller_1.update);
/**
 * DELETE /resource/:resourceId
 */
router.delete("/:resourceId", order_controller_1.destroy);
exports.default = router;
