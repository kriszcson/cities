import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unathorized' });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, actualUser) => {
        if (!error) {
            req.user = actualUser;
            next();
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unathorized' });
        }
    });
};

async function authenticateAdmin(req, res, next) {
    try {
        const actualUser = req.user;
        if (!actualUser) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                error: "You need to be logged in to access this route."
            });
        }
        if (actualUser.user_role !== 'admin') {
            return res.status(StatusCodes.FORBIDDEN).json({
                error: "You dont have permission to access this route."
            });

        }
        next();
    } catch (error) {
        next(error);
    }
};


export { authenticateToken, authenticateAdmin };