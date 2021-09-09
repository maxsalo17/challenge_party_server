const mongoose = require('../../utils/mongoose');
const suid = require('rand-token').suid;
const jwt = require('jsonwebtoken');
const config = require('config')


const UserSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    token: { type: String },
    username: { type: String, unique: true },
    ip: { type: String },
    credentials: { type: Object, default: {} }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });


/**
 * Generates id for new user
 * @returns {ObjectId}
 */
UserSchema.statics.generateID = function generateID() {
    return mongoose.Types.ObjectId();
}

UserSchema.statics.signUp = async function (data) {
    let user = new User(data);
    await user.save();

    return user;
}

/**
 * Generates JWT token
 */
UserSchema.methods.generateAuthToken = async function generateAuthToken(shouldExpire = true) {
    this.token = suid(50);
    await this.save();
    return jwt.sign({ id: this.id, _id: this._id, username: this.username, deviceId: this.deviceId, token: this.token }, config.get('privateKey'), {
        expiresIn: shouldExpire ? '30 days' : '1000 days',
    });
}

UserSchema.statics.verifyToken = function (token) {
    const tokenData = jwt.verify(token, config.get("privateKey"));
    return tokenData
}


const User = mongoose.model('User', UserSchema);
module.exports = User;
