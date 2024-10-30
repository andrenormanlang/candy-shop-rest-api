/**
 * Products Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

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
export const store = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).send({
        status: "fail",
        data: validationErrors.array()
      });
    }
  
    // Validate product IDs
    const productIds = req.body.order_items.map((item: any) => item.product_id);
    const existingProducts = await prisma.product.findMany({
      where: {
        id: { in: productIds }
      }
    });
  
    if (existingProducts.length !== productIds.length) {
      // Some product IDs are missing from the products table
      return res.status(400).send({
        status: "fail",
        message: "One or more products in the order do not exist."
      });
    }
  
    // If all product IDs exist, proceed to create the order
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
          items: {
            create: req.body.order_items
          }
        },
        include: { items: true }
      });
      res.status(201).send({
        status: "success",
        data: order
      });
    } catch (err) {
      console.log("Error thrown when creating an order %o: %o", req.body.order, err);
      res.status(500).send({ message: "Something went wrong" });
    }
  };
  


/**
 * Update an order
 */
export const update = async (req: Request, res: Response) => {
    const orderId = Number(req.params.orderId);
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array()
        });
    }

    try {
        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                customer_first_name: req.body.customer_first_name,
                customer_last_name: req.body.customer_last_name,  
                customer_address: req.body.customer_address,    
                customer_postcode: req.body.customer_postcode,        
                customer_city: req.body.customer_city,       
                customer_email: req.body.customer_email,      
                customer_phone: req.body.customer_phone,      
                order_total: req.body.order_total,
            },
            include: { items: true }
        });

        res.send({
            status: "success",
            data: updatedOrder
        });
    } catch (err) {
		if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
            return res.status(404).send({
                error: "Order not found."
            });
        }
        console.error(err);
        res.status(500).send({ message: "Something went wrong" });
    }
};


/**
 * Delete a order
 */
export const destroy = async (req: Request, res: Response) => {
    const orderId = Number(req.params.orderId);
    try {
        await prisma.order.delete({
            where: {
                id: orderId
            }
        });
        res.send({
            status: "success",
            message: "Order deleted successfully."
        });
    } catch (err) {
		if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
            return res.status(404).send({
                error: "Order not found."
            });
        }
        console.error(err);
        res.status(500).send({ message: "Something went wrong" });
    }
};