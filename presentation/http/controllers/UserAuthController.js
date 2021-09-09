
const BaseSuccessResponse = require('../../../data/models/responses/BaseSuccessResponse')
const ServerSideErrorResponse = require('../../../data/models/responses/ServerSideErrorResponse')
const NoRequiredParamErrorResponse = require('../../../data/models/responses/NoRequiredParamErrorResponse')
const User = require('../../../data/models/mongoose/User')

class UserAuthController {



    static async signInAnonymously(req, res) {
        try {
            if (!(req.body.device_id)) {
                res.status(400).json(new NoRequiredParamErrorResponse());
                return;
            }
            console.log('Checking for user with device_id', req.body.device_id);
            let candidate = await User.findOne({ deviceId: req.body.device_id });
            if (!candidate) {
                candidate = await User.signUp({
                    id: User.generateID(),
                    deviceId: req.body.device_id,
                    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                });

            }
            const token = await candidate.generateAuthToken();
            candidate = await candidate.save();
            console.log("User signed in", token, candidate);
            res.json(new BaseSuccessResponse('JWT_TOKEN', token));
        } catch (e) {
            console.log(e);
            res.status(500).json(new ServerSideErrorResponse(e));
        }
    }

    static async checkToken(req, res) {
        try {
            const token = req.body.token;
            if (!token) return res.send({
                success: false,
                type: "TOKEN_INVALID"
            });
            let tokenData = User.verifyToken(token)
            let user = await User.findOne({ _id: tokenData._id }).exec();
            if (user) {
                return res.send({
                    success: true,
                    type: "TOKEN_VALID"
                });
            }
            else {
                return res.send({
                    success: false,
                    type: "TOKEN_INVALID"
                });
            }
        }
        catch (ex) {
            console.log(ex);
            res.status(500).send(new ServerSideErrorResponse(ex));
        }
    }


    /**
     * Auth middleware for express
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    static async isAuthorized(req, res, next) {

        const token = req.headers["x-access-token"] || req.headers["authorization"];
        if (!token) return res.status(400).send({
            success: false,
            type: "NO_TOKEN",
            error: "You trying to call method withou required token"
        });

        try {
            const tokenData = User.verifyToken(token);
            let user = await User.findOne({ _id: tokenData._id }).exec();

            if (!user) return res.status(401).send({
                success: false,
                type: "AUTH_FAILED",
                error: 'Authorization failed'
            });


            req.user_id = user.id;
            req.user = user;

            next();
        } catch (ex) {
            console.log(ex);
            res.status(500).send({
                success: false,
                type: "INTERNAL_ERROR",
                error: ex.message
            });
        }
    }

}

module.exports = UserAuthController;