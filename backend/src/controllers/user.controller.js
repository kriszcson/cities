import express from 'express';
import pool from '../../db/db.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';


const router = express.Router();

async function getUsers(req, res) {
    try {
        const users = await pool.query('SELECT * FROM users;');
        res.status(StatusCodes.OK).json(users.rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const user = await pool.query('SELECT * FROM users WHERE user_id = $1;', [id]);
        res.status(StatusCodes.OK).json(user.rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

async function insertUser(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await pool.query(`
        INSERT INTO users(user_name, user_email, user_password, user_role)
            VALUES ($1, $2, $3, $4) RETURNING *
            `, [
            req.body.name, req.body.email, hashedPassword, req.body.role
        ]);
        res.status(StatusCodes.OK).json({ user: newUser.rows[0] });
    } catch (err) {
        console.log(err);
    }
}

async function updateUser(req, res) {
    try {
        let hashedPassword;
        if (req.body.user_password) {
            hashedPassword = await bcrypt.hash(req.body.user_password, 10);
        }
        const newEmail = req.body.user_new_email || req.body.user_email;
        const userToUpdate = await pool.query(`
                UPDATE users SET user_name = $1, user_email = $2, user_password = $3, user_role = $4 WHERE user_email = $5;
                `, [
            req.body.user_name, newEmail, hashedPassword, req.body.user_role, req.body.user_email
        ]);
        if (userToUpdate.rowCount > 0) {
            return res.status(StatusCodes.NO_CONTENT).json();
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found!" });
        }

    } catch (err) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: err });
    }
}

async function getUserIdByName(req, res) {
    const { user_email } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1;', [user_email]);
    if (user.rowCount === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found!' });
    }
    return res.status(StatusCodes.OK).json({ id: user.rows[0].user_id });
}

async function deleteUser(req, res) {
    try {
        const email = req.params.email;
        console.log(email)
        const userToDelete = await pool.query(`
                DELETE FROM users WHERE user_email = $1;
                `, [email]);
        console.log(userToDelete);
        if (userToDelete.rowCount > 0) {
            return res.status(StatusCodes.NO_CONTENT).json();
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found!" });
        }
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
    }
}


export { getUsers, getUserById, insertUser, updateUser, deleteUser, getUserIdByName }
export default router;