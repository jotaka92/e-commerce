import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { UserModel } from '../models/user.js';

const register = async(req, res) => {
    try {
        
        const { username, email, password } = req.body

        if(!username || !email || !password) {
            return res.status(400).json({
                ok: false,
                message: 'All fields are required'
            });
        }

        const user = await UserModel.findOneByEmail(email);
        if(user) {
            return res.status(409).json({
                ok: false,
                message: 'User already exists'
            });
        }

        const salt = await bcryptjs.genSaltSync(10);
        const hashedpassword = await bcryptjs.hash(password, salt);

        const newUser = await UserModel.create({ username, email, password: hashedpassword });

        const token = jwt.sign(
            { email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' });

        return res.status(201).json({
            ok: true,
            msg: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({               
                error: 'Missing required fields: email, password'
            });
        }

        const user = await UserModel.findOneByEmail(email);
        if(!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword) {
            return res.status(401).json({
                error: 'Invalid credentials'
            })
        }

        const token = jwt.sign({
            email: user.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        return res.json({
            ok: true,
            msg: token
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Internal server error'
        })
    }
}

export const UserController = {
    register,
    login
}