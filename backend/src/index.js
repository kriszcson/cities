import dotenv from 'dotenv';
import express, { json } from 'express';
import { StatusCodes } from "http-status-codes";
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routes/api.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = { credentials: true, origin: process.URL || '*' };


app.use(express.json());

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use('/api', router);


app.get('/', (req, res) => {
    return res.status(StatusCodes.OK).send({ health: 'ok' });
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});