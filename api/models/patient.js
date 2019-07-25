var mongoose = require('mongoose');

const patientschema = new mongoose.Schema({
    fullName: String,
    location: { type: String },
    hospitalName: String,
    phonNumber: String,
    gender: { type: String },
    bloodType: { type: String, enum: [" O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] },
});

const patienClass = mongoose.model('patient', patientschema);

module.exports = patienClass;