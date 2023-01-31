/* Handle all / products routes */
import express from 'express'
import {body} from 'express-validator'
import {index, show, store, update, destroy} from '../controllers/product_controller'
const router = express.Router()

/**
 * GET /products
 */
router.get('/', index)

/**
 * GET /resource/:resourceId
 */
router.get('/:productId', show)

/**
 * POST /resource
 */
router.post('/', [
	body('price').isInt({ min: 1}).withMessage('has to be at least 1'),
    body('stock_quantity').isInt({ min: 0}).withMessage('has to be at least 0'),
], store)



export default router

