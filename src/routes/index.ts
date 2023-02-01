import express from "express"
import orders from './orders'
import products from './products'
import {createOrderRules} from '../validations/order_rules'
// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

/**
 * [EXAMPLE] /resource
 */
// router.use('/resource', resource)


/**
 * /products
 */
router.use('/products', products )

/**
 * /orders
 */
router.use('/orders', orders )

export default router
