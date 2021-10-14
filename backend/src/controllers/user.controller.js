import { StatusCodes } from 'http-status-codes';

import expres from 'express';

export const getUsersController = async(req, res, next) => {
    try {
        const users = await pool.query('SELECT * FROM users;');
        res.status(StatusCodes.OK).json(users);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};