import express from 'express';
import pool from '../../db/db.js';
import { getUsersController } from '../controllers/user.controller.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { authenticateToken } from '../middlewares/authorization.js';

const router = express.Router();


router.get('/', async(req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users;');
        res.status(StatusCodes.OK).json(users.rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.post('/', async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await pool.query(`
        INSERT INTO users(user_name, user_email, user_password)
            VALUES ($1, $2, $3) RETURNING *
            `, [
            req.body.name, req.body.email, hashedPassword
        ]);
        res.status(StatusCodes.OK).json({ user: newUser.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const users = await pool.query(`
        INSERT INTO users(user_name, user_email, user_password)
            VALUES ($1, $2, $3) RETURNING *`, [
            req.body.name, req.body.email, hasheddPassword
        ]);
        res.status(StatusCodes.OK).json(users);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


export default router;