const UserAuthController = require('../controllers/UserAuthController')
const userMiddlewares = [UserAuthController.isAuthorized];

module.exports = userMiddlewares;