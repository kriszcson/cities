import jwt from 'jsonwebtoken';

function jwtTokens({ user_id, user_name, user_email }) {
    const user = { user_id, user_name, user_email };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10d' });

    return ({ accessToken, refreshToken })
}

export { jwtTokens };