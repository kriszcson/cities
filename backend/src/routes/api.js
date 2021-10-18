import express from 'express';
import { deleteRefreshToken, getRefreshToken, login, signup } from '../controllers/auth.controller.js';
import { getCities, getCityByName, insertCity } from '../controllers/cities.controller.js';
import { deleteUser, getUserById, getUsers, insertUser, updateUser } from '../controllers/user.controller.js';
import { authenticateAdmin, authenticateToken } from '../middlewares/authorization.js';

const router = express.Router();


router.post('/auth/login', login);
router.post('/auth/signup', signup);

router.use(authenticateToken);

router.get('/auth/refresh_token', getRefreshToken);
router.delete('/auth/refresh_token', deleteRefreshToken);

router.get('/cities', getCities);
router.post('/cities', insertCity);
router.get('/cities/:city', getCityByName);

router.use(authenticateAdmin);

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', insertUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


export default router;