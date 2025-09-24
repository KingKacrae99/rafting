require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URL;
db.trips = require('./trips.js')(mongoose);

module.exports = db;