import {db} from '/database/db.js';

const create = async({username, email, password}) => {
    // evitar sql injections
    const query = {
        text: `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email
        `,
        values: [username, email, password]
    }

    const {rows} = await db.query(query);
    return rows;
}

const findOneByEmail = async(email) => {
    const query = {
        text: `
        SELECT * FROM users
        WHERE email = $1
        `,
        values: [email]
    }

    const {rows} = await db.query(query);
    return rows[0];
}

export const UserModel = {
    create,
    findOneByEmail
}