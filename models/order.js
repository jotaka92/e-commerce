import { db } from '../database/connection.js';

const reduceQuantity = async (productId, quantity) => {
    const query = {
        text: `
            UPDATE products
            SET quantity = quantity - $1
            WHERE id = $2 AND quantity >= $1
        `,
        values: [quantity, productId]
    };

    const { rows } = await db.query(query);
    return rows[0];
};

export const OrderModel = {
    reduceQuantity
};
