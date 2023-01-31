/**
 * Products Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('prisma-bortakvall:order_controller')

/**
 * Get all orders
 */
export const index = async (req: Request, res: Response) => {
	try {
		const orders = await prisma.order.findMany()

		res.send({
			status: "success",
			data: orders,
		})

	} catch (err) {
		debug("Error thrown when finding products", err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * Get a single order
 */
export const show = async (req: Request, res: Response) => {
    const orderId = Number(req.params.orderId)
	try{
		const order = await prisma.order.findUniqueOrThrow({
			where: {
                
				id: orderId,
			},
			include: {
				items: true	
			}
			
	
		})
		res.send({
			status: "success",
			data: order,
		})
	}catch (err){
        debug("Error thrown when finding book with id %o: %o", req.params.orderId, err)
	 	console.error(err)
	 	res.status(404).send({
		error: "Not found."
	 	})
	}
}

/**
 * Create a order
 */
export const store = async (req: Request, res: Response) => {const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()){
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array()
		})
	}
	try {
		const order = await prisma.order.create({
            data: {
				customer_first_name: req.body.customer_first_name,
				customer_last_name: req.body.customer_last_name,  
				customer_address: req.body.customer_address,    
				customer_postcode: req.body.customer_postcode,        
				customer_city: req.body.customer_city,       
				customer_email: req.body.customer_email,      
				customer_phone: req.body.customer_phone,      
				order_total: req.body.order_total,
				items: req.body.items //???       
				
			}

		})
		res.status(201).send({
			status: "success",
			data: order
		})
	} catch(err){
        debug("Error thrown when creating a book %o: %o", req.body, err)
		res.status(500).send({message:"Something went wrong"})
	}
}

/**
 * Update a resource
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete a resource
 */
export const destroy = async (req: Request, res: Response) => {
}