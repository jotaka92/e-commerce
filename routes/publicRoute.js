import { Router } from "express";
import path from "path";

const router = Router();

const __dirname = import.meta.dirname;
const publicPath = path.join(__dirname, "../public");

router.get('/login', (req, res) => {
    res.sendFile(publicPath + '/login.html');
});

router.get('/signup', (req, res) => {
    res.sendFile(publicPath + '/signup.html');
});

export default router;