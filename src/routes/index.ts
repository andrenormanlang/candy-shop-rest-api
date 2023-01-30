import express from "express"
import products from './products'
import resource from './_router'

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

router.use('/products', products )

export default router
