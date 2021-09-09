const mongoose = require('../../utils/mongoose');


const GameSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: { type: String },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    isPrivate: { type: Boolean, default: false },
    entryCode: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'waiting', enum: ['waiting', 'running', 'finished'] }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

/**
 * Generates id for new game
 * @returns {ObjectId}
 */
GameSchema.statics.generateID = function generateID() {
    return mongoose.Types.ObjectId();
}

GameSchema.statics.generateRandomGameName = function generateID() {
    return `Challenge${Date.now()}`;
}


const Game = mongoose.model('Game', GameSchema);
module.exports = Game;
