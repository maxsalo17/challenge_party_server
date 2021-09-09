const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = global.Promise;


mongoose.connect(config.get('mongodb.host'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 * 2,
    socketTimeoutMS: 45000 * 2,
    keepAlive: true,
    keepAliveInitialDelay: 1000 * 60 * 60 * 24,
});

mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

mongoose.connection.on('connecting', (data) => {
    console.log(`[Mongoose] Connecting`, data);
});

mongoose.connection.on('connected', (data) => {
    console.log(`[Mongoose] Connected`, data);
});

mongoose.connection.on('disconnecting', (data) => {
    console.log(`[Mongoose] Disconnecting`, data);
});

mongoose.connection.on('disconnected', (data) => {
    console.log(`[Mongoose] Disconnected`, data);
});

mongoose.connection.on('reconnected', (data) => {
    console.log(`[Mongoose] Reconnected`, data);
});

mongoose.connection.on('reconnectFailed', (data) => {
    console.log(`[Mongoose] Reconnect failed`, data);
});


module.exports = mongoose;
