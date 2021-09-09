const router = require('express').Router();
const UserAuthController = require('../controllers/UserAuthController')



router.route('/signin/anonymously').post(UserAuthController.signInAnonymously);

router.route('/check').post(UserAuthController.checkToken);


module.exports = router;