import { StatusCodes } from 'http-status-codes';
import pool from '../../db/db.js';
import bcrypt from 'bcrypt';
import { jwtTokens } from '../utils/jwt-helpers.js';
import jwt from 'jsonwebtoken';


async function login(req, res) {
    try {
        const { email, password } = req.body;
        const users = await pool.query(`
        SELECT * FROM users WHERE user_email = $1`, [email]);

        if (users.rows.length === 0) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid credentials!" })
        };
        const isValidPassword = await bcrypt.compare(password, users.rows[0].user_password);
        if (!isValidPassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid credentials!" })
        };
        const user = users.rows[0];
        const tokens = jwtTokens(user);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.json({
            name: user.user_name,
            email: user.user_email,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
    }
};

async function signup(req, res) {
    try {
        const { user_email, user_name, user_password } = req.body;

        const haveUserWithEmail = await pool.query(`
        SELECT * FROM users WHERE user_email = $1`, [user_email]);
        if (haveUserWithEmail.rowCount !== 0) {
            return res.status(StatusCodes.CONFLICT).json({ error: 'Email already registered.' })
        }
        const hashedPassword = await bcrypt.hash(user_password, 10);
        const newUser = await pool.query(`
        INSERT INTO users (user_email, user_name, user_password, user_role) VALUES ($1, $2, $3, $4)`, [user_email, user_name, hashedPassword, 'user']);
        const tokens = jwtTokens(newUser);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.json({
            name: user_name,
            email: user_email,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
    }
};

async function getRefreshToken(req, res) {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (refreshToken === null) return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unathorized" });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(StatusCodes.FORBIDDEN).json({ error: error });
            const tokens = jwtTokens(user);
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true, sameSite: 'none', secure: true });
            res.json(tokens);
        });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unathorized" });
    }
};

async function deleteRefreshToken(req, res) {
    try {
        res.clearCookie('refresh_token');
        return res.status(StatusCodes.OK).json({ message: "Refresh token deleted successfully" });
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
    }
};


export { login, signup, getRefreshToken, deleteRefreshToken }