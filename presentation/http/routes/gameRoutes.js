const router = require('express').Router();
const GameController = require('../controllers/GameController')

router.route('/:game/connect').post(GameController.connect)

router.route('/list').get(GameController.getAll)

router.route('/new').post(GameController.new)


module.exports = router;