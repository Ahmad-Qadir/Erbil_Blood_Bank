var mongoose = require('mongoose');

const patientschema = new mongoose.Schema({
    fullName: String,
    location: { type: String, enum: ["erbil", "sulemany", "dhok", "karkwk"] },
    hospitalName: String,
    phonNumber: String,
    gender: { type: String, enum: ["male", "female"] },
});

const patienClass = mongoose.model('patien', patientschema);

module.exports = patienClass;