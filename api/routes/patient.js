const express = require('express');
const app = express();
const joi = require('joi');
require('../connections/serverConnection');
const patienClass = require('../models/patient');
app.use(express.json());
var router = express.Router();

//insert patient
router.post('/insert', (req, res) => {
    const schema = {
        fullName: joi.string().required().min(20),
        location: joi.string().required(),
        hospitalName: joi.string().required(),
        phonNumber: joi.string().required(),
        gender: joi.string().required(),
    }
    const resulteschema = joi.validate(req.body, schema);

    if (resulteschema.error) {
        res.status(404).send({
            message: resulteschema.error.details[0].message
        });
    } else {
        const resetPatient = new patienClass({
            fullName: req.body.fullName,
            location: req.body.location,
            hospitalName: req.body.hospitalName,
            phonNumber: req.body.phonNumber,
            gender: req.body.gender,
        });
        resetPatient.save();
    }
});

//shows patient
router.get('/shows', async(req, res) => {
    const result = await patienClass.find({}).sort({ name: 1 });
    res.json(result);
});

//shows patient by parametar
router.get('/shows/:id', async(req, res) => {
    const result = await patienClass.find({ _id: req.params.id }).sort({ name: 1 });
    res.json(result);
});

//search patient
router.get('/search', async(req, res) => {
    const location = req.body.location;
    const hospitalName = req.body.hospitalName;

    const result = await patienClass.find({})
        .or([{ location: location }, { hospitalName: hospitalName }])

    res.json(result);

});

//delete patient
router.delete('/delete/:id', async(req, res) => {
    const result = await patienClass.deleteOne({ _id: req.params.id });
    res.json(result);
});

//update  patient
router.put('/update/:id', (req, res) => {
    var fullName = req.body.fullName;
    var location = req.body.location;
    var hospitalName = req.body.hospitalName;
    var phonNumber = req.body.phonNumber;
    var gender = req.body.gender;
    const valedateSchema = {
        fullName: joi.string().required(),
        location: joi.string().required(),
        hospitalName: joi.string().required(),
        phonNumber: joi.string().required(),
        gender: joi.string().required(),
    }
    const resultvalidate = validator.validate(req.body, valedateSchema);

    if (resultvalidate.error)
        return res.status(400).send({
            message: resultvalidate.error.details[0].message
        });
    await patienClass.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            fullName: fullName,
            location: location,
            hospitalName: hospitalName,
            phonNumber: phonNumber,
            gender: gender
        }
    }, { new: true });
});

module.exports = router;