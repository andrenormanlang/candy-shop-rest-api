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
exports.destroy = exports.update = exports.store = exports.show = exports.index = void 0;
/**
 * Products Template
 */
const debug_1 = __importDefault(require("debug"));
const express_validator_1 = require("express-validator");
const prisma_1 = __importDefault(require("../prisma"));
const runtime_1 = require("@prisma/client/runtime");
// Create a new debug instance
const debug = (0, debug_1.default)('prisma-bortakvall:order_controller');
/**
 * Get all orders
 */
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield prisma_1.default.order.findMany();
        res.send({
            status: "success",
            data: orders,
        });
    }
    catch (err) {
        debug("Error thrown when finding products", err);
        res.status(500).send({ status: "error", message: "Something went wrong" });
    }
});
exports.index = index;
/**
 * Get a single order
 */
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = Number(req.params.orderId);
    try {
        const order = yield prisma_1.default.order.findUniqueOrThrow({
            where: {
                id: orderId,
            },
            include: {
                items: true
            }
        });
        res.send({
            status: "success",
            data: order,
        });
    }
    catch (err) {
        debug("Error thrown when finding book with id %o: %o", req.params.orderId, err);
        console.error(err);
        res.status(404).send({
            error: "Not found."
        });
    }
});
exports.show = show;
/**
 * Create a order
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
        const order = yield prisma_1.default.order.create({
            data: {
                customer_first_name: req.body.customer_first_name,
                customer_last_name: req.body.customer_last_name,
                customer_address: req.body.customer_address,
                customer_postcode: req.body.customer_postcode,
                customer_city: req.body.customer_city,
                customer_email: req.body.customer_email,
                customer_phone: req.body.customer_phone,
                order_total: req.body.order_total,
                items: { create: req.body.order_items }
            },
            include: { items: true }
        });
        res.status(201).send({
            status: "success",
            data: order
        });
    }
    catch (err) {
        console.log("Error thrown when creating a order %o: %o", req.body.order, err);
        res.status(500).send({ message: "Something went wrong" });
    }
});
exports.store = store;
/**
 * Update an order
 */
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = Number(req.params.orderId);
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array()
        });
    }
    try {
        const updatedOrder = yield prisma_1.default.order.update({
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
    }
    catch (err) {
        if (err instanceof runtime_1.PrismaClientKnownRequestError && err.code === 'P2025') {
            return res.status(404).send({
                error: "Order not found."
            });
        }
        console.error(err);
        res.status(500).send({ message: "Something went wrong" });
    }
});
exports.update = update;
/**
 * Delete a order
 */
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = Number(req.params.orderId);
    try {
        yield prisma_1.default.order.delete({
            where: {
                id: orderId
            }
        });
        res.send({
            status: "success",
            message: "Order deleted successfully."
        });
    }
    catch (err) {
        if (err instanceof runtime_1.PrismaClientKnownRequestError && err.code === 'P2025') {
            return res.status(404).send({
                error: "Order not found."
            });
        }
        console.error(err);
        res.status(500).send({ message: "Something went wrong" });
    }
});
exports.destroy = destroy;
