/* Handle all / products routes */
import express from 'express'
import {body} from 'express-validator'
import {index, show, store, update, destroy} from '../controllers/products_controller'
const router = express.Router()

/**
 * GET /products
 */
router.get('/', index)


export default router

