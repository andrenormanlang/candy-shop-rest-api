/* Handle all / products routes */
import express from "express";
import { body } from "express-validator";
import {
  index,
  show,
  store,
  update,
  destroy,
} from "../controllers/order_controller";
const router = express.Router();

/**
 * GET /products
 */
router.get("/", index);

/**
 * GET /resource/:resourceId
 */
router.get("/:productId", show);

/**
 * POST /resource
 */
router.post(
  "/",
  [
    router.post('/', [
      body('customer_email').isEmail().withMessage('This is an e-mail field'), 
        body('customer_postcode').isLength({ max: 6 }).withMessage('This postcode is a max. of 6 characters'),
        body('order_total').isLength({ min: 1 }).withMessage('Your order should contain at least 1 product'),
    ], store),
  ],
  store
);

export default router;
