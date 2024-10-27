import 'dotenv/config';
import express from 'express';
import userRouter from './routes/userRoute.js';

const app = express();

app.use('/api/v1/users', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}.`); })