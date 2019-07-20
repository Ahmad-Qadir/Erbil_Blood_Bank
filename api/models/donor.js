var mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const donorSchema = new mongoose.Schema({
    username: String,
    password: { type: String, default: Math.random().toString(36).slice(2) },
    name: String,
    email: String,
    phoneNumber: String,
    location: { type: String, enum: ["Erbil", "Duhok", "Sulemani", "Kerkuk", "Soran", "Koya", "Halabja"] },
    age: Number,
    IDNumber: String,
    gender: { type: String, enum: ["Male", "Female"] },
    latestDateofDonation: Date,
    bloodType: { type: String, enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] },
    testDate: { type: Date, default: Date.now },
    employer: { type: String, enum: ["Ahmed", "Hevi", "Gashbeen", "Shayma", "Noor", "Helen", "Gulala", "Sumayya"] },
});

//custom method to generate authToken 
donorSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id}, config.get('myprivatekey'));
    return token;
}

const DonorClass = mongoose.model('donors', donorSchema);

module.exports = DonorClass;