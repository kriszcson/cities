 import { StatusCodes } from 'http-status-codes';

 exports = async() => {
     try {
         const users = await pool.query('SELECT * FROM users;');
         res.status(StatusCodes.OK).json(users);
     } catch (err) {
         res.status(err.code).json({ error: err.message });
     }
 };