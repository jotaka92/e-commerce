import { OrderModel } from '../models/order.js';

const buy = async (req, res) => {
    try {
        const { items } = req.body;

        for (const item of items) {
            const { productId, quantity } = item;

            // Lógica para reducir la cantidad del producto
            await OrderModel.reduceQuantity(productId, quantity);
        }

        return res.status(200).json({
            ok: true,
            msg: 'Order completed successfully'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
};

export const OrderController = {
    buy
};
