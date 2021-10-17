import { StatusCodes } from 'http-status-codes';
import pool from '../../db/db.js';


async function getCities(req, res) {
    try {
        const cities = await pool.query(`SELECT * FROM cities;`);
        return res.status(StatusCodes.OK).json({ cities: cities.rows });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
    }
}

async function insertCity(req, res) {
    try {
        const city = await pool.query(`
            INSERT INTO
            cities(
                city_name,
                city_short_desc,
                city_long_desc,
                city_img_url
            )
            VALUES($1, $2, $3, $4)  RETURNING *`, [
            req.body.city_name,
            req.body.city_short_desc,
            req.body.city_long_desc,
            req.body.city_img_url,
        ]);
        return res.status(StatusCodes.OK).json(city.rows);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
    }
}

export { getCities, insertCity };