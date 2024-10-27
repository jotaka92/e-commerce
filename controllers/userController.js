import {UserModel} from '/models/user.js';

const register = async(req, res) => {
    try {
        console.log(req.body);
        const {username, email, password} = req.body

        return res.json({
            ok: true,
            message: 'User registered successfully'
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Internal server error'
        })
    }
}

const login = async(req, res) => {
    try {

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