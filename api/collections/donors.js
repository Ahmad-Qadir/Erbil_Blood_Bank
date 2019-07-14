var mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    username: String,
    password: { type: String, default: Math.random().toString(36).slice(2) },
    name: String,
    email: String,
    phoneNumber: String,
    location: String,
    startDate: { type: Date, default: Date.now },
    points: Number,
    testResult: Boolean,
    testDate: { type: Date, default: Date.now }
});


const DonorClass = mongoose.model('donors', donorSchema);


module.exports = DonorClass;