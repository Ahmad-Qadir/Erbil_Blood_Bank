var mongoose = require('mongoose');

const patientschema = new mongoose.Schema({
    fullName: String,
    location: { type: String, enum: ["erbil", "sulemany", "dhok", "karkwk"] },
    hospitalName: String,
    phonNumber: String,
    gender: { type: String, enum: ["male", "female"] },
    bloodType: { type: String, enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] },
});

const patienClass = mongoose.model('patien', patientschema);

module.exports = patienClass;