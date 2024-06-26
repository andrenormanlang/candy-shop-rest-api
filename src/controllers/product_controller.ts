/**
 * Products Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('prisma-bortakvall:product_controller')

/**
 * Get all products
 */
export const index = async (req: Request, res: Response) => {
	try {
		const products = await prisma.product.findMany()

		res.send({
			status: "success",
			data: products,
		})

	} catch (err) {
		console.log("Error thrown when finding products with id %o: %o", err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * Get a single product
 */
export const show = async (req: Request, res: Response) => {
    const productId = Number(req.params.productId)
	try{
		const product = await prisma.product.findUniqueOrThrow({
			where: {
                
				id: productId,
			}
			
	
		})
		res.send({
			status: "success",
			data: product,
		})
	}catch (err){
        debug("Error thrown when finding product with id %o: %o", req.params.productId, err)
	 	console.error(err)
	 	res.status(404).send({
		error: "Not found."
	 	})
	}
}

/**
 * Create a product
 */
export const store = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()){
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array()
		})
	}
	try {
		const product = await prisma.product.create({
            data: {
				name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                images: req.body.images,
                stock_status: req.body.stock_status,
                stock_quantity: req.body.stock_quantity
			}
		})
		res.status(201).send({
			status: "success",
			data: product
		})
	} catch(err){
        debug("Error thrown when creating a book %o: %o", req.body, err)
		res.status(500).send({message:"Something went wrong"})
	}
}

/**
 * Create multiple products
 */
/**
 * Create multiple products
 */
export const storeMany = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array()
        });
    }
    
    // Expect req.body to be an array of products
    if (!Array.isArray(req.body)) {
        return res.status(400).send({
            status: "fail",
            message: "Expected an array of products."
        });
    }

    try {
        // Prepare product data with a default stock_quantity if not provided
        const productData = req.body.map(product => ({
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images,
            stock_status: product.stock_status,
            // Use provided stock_quantity or default to 0
            stock_quantity: product.stock_quantity ?? 0
        }));

        // The `createMany` method is used for bulk creation of records.
        const products = await prisma.product.createMany({
            data: productData,
            skipDuplicates: true // Optionally skip duplicates
        });

        res.status(201).send({
            status: "success",
            data: products,
            message: "Products created successfully."
        });
    } catch (err) {
        debug("Error thrown when creating products %o: %o", req.body, err);
        res.status(500).send({ status: "error", message: "Something went wrong" });
    }
};

// export const storeMany = async (req: Request, res: Response) => {
//     const validationErrors = validationResult(req);
//     if (!validationErrors.isEmpty()) {
//         return res.status(400).send({
//             status: "fail",
//             data: validationErrors.array()
//         });
//     }
    
//     // Expect req.body to be an array of products
//     if (!Array.isArray(req.body)) {
//         return res.status(400).send({
//             status: "fail",
//             message: "Expected an array of products."
//         });
//     }

//     try {
//         // The `createMany` method is used for bulk creation of records.
//         const products = await prisma.product.createMany({
//             data: req.body.map(product => ({
//                 name: product.name,
//                 description: product.description,
//                 price: product.price,
//                 images: product.images,
//                 stock_status: product.stock_status,
//                 stock_quantity: product.stock_quantity
//             })),
//             skipDuplicates: true // Optionally skip duplicates
//         });
//         res.status(201).send({
//             status: "success",
//             data: products,
//             message: "Products created successfully."
//         });
//     } catch (err) {
//         debug("Error thrown when creating products %o: %o", req.body, err);
//         res.status(500).send({ status: "error", message: "Something went wrong" });
//     }
// };

/**
 * Update a product
 */
export const update = async (req: Request, res: Response) => {
    const productId = Number(req.params.productId);
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array()
        });
    }

    try {
        const product = await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                images: req.body.images,
                stock_status: req.body.stock_status,
                stock_quantity: req.body.stock_quantity,
            }
        });
        res.send({
            status: "success",
            data: product,
        });
    } catch (err) {
        debug("Error thrown when updating product with id %o: %o", productId, err);
        res.status(500).send({ status: "error", message: "Something went wrong" });
    }
};

/**
 * Delete a product
 */
export const destroy = async (req: Request, res: Response) => {
    const productId = Number(req.params.productId);
    try {
        await prisma.product.delete({
            where: {
                id: productId,
            },
        });
        res.send({
            status: "success",
            message: "Product deleted successfully."
        });
    } catch (err) {
		const error = err as Error;
		debug("Error thrown when updating product with id %o: %o", productId, error);
		if ('code' in error && error.code === 'P2025') {
			return res.status(404).send({
				status: "error",
				message: "Product not found."
			});
		}
		res.status(500).send({ status: "error", message: "Something went wrong" });
	}
};