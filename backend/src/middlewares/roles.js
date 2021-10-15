import { roles } from '../utils/accesscontrol.js';

async function grantAccess(action, resource) {
    return async(req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            console.log(permission);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next();
        } catch (error) {
            next(error)
        }
    }
};

async function allowIfLoggedin(req, res, next) {
    try {
        const actualUser = res.locals.loggedInUser;
        if (!actualUser)
            return res.status(401).json({
                error: "You need to be logged in to access this route"
            });
        req.user = actualUser;
        next();
    } catch (error) {
        next(error);
    }
};

export { grantAccess, allowIfLoggedin }