import express from 'express';
import pool from '../../db/db.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtTokens } from '../utils/jwt-helpers.js';

const router = express.Router();


router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const users = await pool.query(`
        SELECT * FROM users WHERE user_email = $1`, [email]);

        const isValidPassword = await bcrypt.compare(password, users.rows[0].user_password);
        if (users.rows.length === 0 || !isValidPassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid credentials!" })
        };
        const user = users.rows[0];
        let tokens = jwtTokens(user);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true, sameSite: 'none', secure: true });
        res.json({
            name: user.user_name,
            email: user.user_email,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
    }
});

router.get('/refresh_token', (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (refreshToken === null) return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unathorized" });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(StatusCodes.FORBIDDEN).json({ error: error });
            let tokens = jwtTokens(user);
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true, sameSite: 'none', secure: true });
            res.json(tokens);
        });
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unathorized" });

    }
})

router.delete('/refresh_token', (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(StatusCodes.OK).json({ message: "Refresh token deleted successfully" });
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
    }
})

export default router;