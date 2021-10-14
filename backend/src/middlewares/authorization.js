import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unathorized' });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (!error) {
            req.user = user;
            next();
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unathorized' });
        }
    });
};

export { authenticateToken };