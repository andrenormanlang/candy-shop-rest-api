/* Handle all / products routes */
import express from 'express'
import {body} from 'express-validator'
import {index, show, store, update, destroy} from '../controllers/product_controller'
import { createProductRules } from "../validations/product_rules";

const router = express.Router()

/**
 * GET /products
 */
router.get('/', index)

/**
 * GET /products/:productId
 */
router.get('/:productId', show)

/**
 * POST /product
 */
router.post('/', createProductRules, store)



export default router

