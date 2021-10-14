import express, { json } from 'express';
import { StatusCodes } from "http-status-codes";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { authenticateToken } from './middlewares/authorization.js';

import userRouter from './routes/user-api.js';
import authRouter from './routes/auth.api.js';


dotenv.config();

const __dirname = dirname(fileURLToPath(
    import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = { credentials: true, origin: process.URL || '*' };

//app.use(express.urlencoded());
app.use(express.json());


app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());


app.use('/api/auth', authRouter);
app.use(authenticateToken);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    return res.status(StatusCodes.OK).send({ health: 'ok' });
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});