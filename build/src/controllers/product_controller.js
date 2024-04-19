"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.storeMany = exports.store = exports.show = exports.index = void 0;
/**
 * Products Template
 */
const debug_1 = __importDefault(require("debug"));
const express_validator_1 = require("express-validator");
const prisma_1 = __importDefault(require("../prisma"));
// Create a new debug instance
const debug = (0, debug_1.default)('prisma-bortakvall:product_controller');
/**
 * Get all products
 */
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma_1.default.product.findMany();
        res.send({
            status: "success",
            data: products,
        });
    }
    catch (err) {
        console.log("Error thrown when finding products with id %o: %o", err);
        res.status(500).send({ status: "error", message: "Something went wrong" });
    }
});
exports.index = index;
/**
 * Get a single product
 */
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = Number(req.params.productId);
    try {
        const product = yield prisma_1.default.product.findUniqueOrThrow({
            where: {
                id: productId,
            }
        });
        res.send({
            status: "success",
            data: product,
        });
    }
    catch (err) {
        debug("Error thrown when finding product with id %o: %o", req.params.productId, err);
        console.error(err);
        res.status(404).send({
            error: "Not found."
        });
    }
});
exports.show = show;
/**
 * Create a product
 */
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array()
        });
    }
    try {
        const product = yield prisma_1.default.product.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                images: req.body.images,
                stock_status: req.body.stock_status,
                stock_quantity: req.body.stock_quantity
            }
        });
        res.status(201).send({
            status: "success",
            data: product
        });
    }
    catch (err) {
        debug("Error thrown when creating a book %o: %o", req.body, err);
        res.status(500).send({ message: "Something went wrong" });
    }
});
exports.store = store;
/**
 * Create multiple products
 */
/**
 * Create multiple products
 */
const storeMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationErrors = (0, express_validator_1.validationResult)(req);
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
        const productData = req.body.map(product => {
            var _a;
            return ({
                name: product.name,
                description: product.description,
                price: product.price,
                images: product.images,
                stock_status: product.stock_status,
                // Use provided stock_quantity or default to 0
                stock_quantity: (_a = product.stock_quantity) !== null && _a !== void 0 ? _a : 0
            });
        });
        // The `createMany` method is used for bulk creation of records.
        const products = yield prisma_1.default.product.createMany({
            data: productData,
            skipDuplicates: true // Optionally skip duplicates
        });
        res.status(201).send({
            status: "success",
            data: products,
            message: "Products created successfully."
        });
    }
    catch (err) {
        debug("Error thrown when creating products %o: %o", req.body, err);
        res.status(500).send({ status: "error", message: "Something went wrong" });
    }
});
exports.storeMany = storeMany;
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
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = Number(req.params.productId);
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array()
        });
    }
    try {
        const product = yield prisma_1.default.product.update({
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
    }
    catch (err) {
        debug("Error thrown when updating product with id %o: %o", productId, err);
        res.status(500).send({ status: "error", message: "Something went wrong" });
    }
});
exports.update = update;
/**
 * Delete a product
 */
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = Number(req.params.productId);
    try {
        yield prisma_1.default.product.delete({
            where: {
                id: productId,
            },
        });
        res.send({
            status: "success",
            message: "Product deleted successfully."
        });
    }
    catch (err) {
        const error = err;
        debug("Error thrown when updating product with id %o: %o", productId, error);
        if ('code' in error && error.code === 'P2025') {
            return res.status(404).send({
                status: "error",
                message: "Product not found."
            });
        }
        res.status(500).send({ status: "error", message: "Something went wrong" });
    }
});
exports.destroy = destroy;
