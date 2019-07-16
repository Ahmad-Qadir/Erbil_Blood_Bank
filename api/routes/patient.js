const express = require('express');
const app = express();
const joi = require('joi');
require('../connections/serverConnection');
const patienClass = require('../models/patient');
app.use(express.json());

app.post('/patient/insert', (req, res) => {
    const schema = {
        fullName: joi.string().required().min(20),
        userName: joi.string().required(),
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
            userName: req.body.userName,
            location: req.body.location,
            hospitalName: req.body.hospitalName,
            phonNumber: req.body.phonNumber,
            gender: req.body.gender,
        });
        resetPatient.save();
    }
});

app.get('/patient/shows', async(req, res) => {
    const result = await patienClass.find({}).sort({ name: 1 });
    res.json(result);
});

app.get('/patient/shows/:id', async(req, res) => {
    const result = await patienClass.find({ _id: req.params.id }).sort({ name: 1 });
    res.json(result);
});

app.get('/patient/search', async(req, res) => {
    const userName = req.body.userName;
    const location = req.body.location;
    const hospitalName = req.body.hospitalName;

    const result = await patienClass.find({})
        .or([{ location: location }, { hospitalName: hospitalName }])
        .and([{ userName: userName }])

    res.json(result);

});

app.delete('/patient/delete/:id', async(req, res) => {
    const result = await patienClass.deleteOne({ _id: req.params.id });
    res.json(result);
});

app.listen(process.env.PORT || 3000);