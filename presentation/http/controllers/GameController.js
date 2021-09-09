
const BaseSuccessResponse = require('../../../data/models/responses/BaseSuccessResponse')
const ServerSideErrorResponse = require('../../../data/models/responses/ServerSideErrorResponse')
const Game = require('../../../data/models/mongoose/Game')
const NoRequiredParamErrorResponse = require('../../../data/models/responses/NoRequiredParamErrorResponse')

class GameController {

    static async getAll(req, res) {
        try {
            const games = await Game.find()

            res.send(new BaseSuccessResponse(
                'ALL_GAMES',
                {
                    games: games || []
                }
            ))

        }
        catch (e) {
            res.status(500).send(new ServerSideErrorResponse(
                `Internal server error: ${e}`
            ))
        }
    }


    static async connect(req, res) {
        try {
            const gameId = req.params.game;
            res.send(new BaseSuccessResponse(
                'CONNECTED',
                {
                    'type': 'game',
                    'id': gameId
                }

            ))
        }
        catch (e) {
            res.status(500).send(new ServerSideErrorResponse(
                `Internal server error: ${e}`
            ))
        }
    }

    static async new(req, res) {
        try {
            if (req.body.isPrivate && !req.body.entryCode) {
                return res.status(400).send(new NoRequiredParamErrorResponse('Game setted as private but no entry code specified'))
            }
            const creator = req.user;
            console.log(`User ${creator} trying to create game`)
            const game = new Game({
                id: req.body.id || Game.generateID(),
                name: req.body.name || Game.generateRandomGameName(),
                isPrivate: req.body.isPrivate,
                entryCode: req.body.entryCode,
                createdBy: creator
            })

            await game.save();

            return res.send(new BaseSuccessResponse(
                'GAME_CREATED',
                {
                    'type': 'game',
                    'id': game
                }

            ))
        }
        catch (e) {
            res.status(500).send(new ServerSideErrorResponse(
                `Internal server error: ${e}`
            ))
        }
    }


}

module.exports = GameController;