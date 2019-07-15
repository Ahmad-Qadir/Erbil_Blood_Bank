var mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    username: String,
    password: { type: String, default: Math.random().toString(36).slice(2) },
    name: String,
    email: String,
    phoneNumber: String,
    location: { type: String, enum: ["Erbil", "Duhok", "Sulemani", "Kerkuk", "Soran", "Koya", "Halabja"] },
    points: Number,
    birthdate: Date,
    IDNumber: String,
    gender: { type: String, enum: ["Male", "Female"] },
    latestDateofDonation: Date,
    bloodType: { type: String, enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] },
    testDate: { type: Date, default: Date.now },
    employer: { type: String, enum: ["Ahmed", "Hevi", "Gashbeen", "Shayma", "Noor", "Helen", "Gulala", "Sumayya"] }
});


const DonorClass = mongoose.model('donors', donorSchema);

module.exports = DonorClass;