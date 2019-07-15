var express = require('express');
var app = express();
var validator = require('joi');
require('../connections/serverConnection');
var DonorClass = require('../models/donors')
app.use(express.json());


app.post('/donor/insert', (req, res) => {
    const validationSchema = {
        username: validator.string().required(),
        password: validator.string().min(7),
        name: validator.string().required().lowercase(),
        phoneNumber: validator.required(),
        location: validator.required(),
        bloodType: validator.required(),
        birthdate: validator.required(),
        IDNumber: validator.required(),
        gender: validator.required()
    }
    const resultOfValidator = validator.validate(req.body, validationSchema);

    if (resultOfValidator.error) {
        res.status(400).send({
            message: resultOfValidator.error.details[0].message
        });
    } else {
        const course = new DonorClass({
            username: req.body.username,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            location: req.body.location,
            name: req.body.name,
            bloodType: req.body.bloodType,
            birthdate: req.body.birthdate,
            IDNumber: req.body.IDNumber,
            gender: req.body.gender
        });
        course.save();
    }
});


app.get('/donor/shows', async (req, res) => {
    const result = await DonorClass.find({}).sort({ name: 1 });
    res.json(result);
});

app.get('/donor/shows/:id', async (req, res) => {
    const result = await DonorClass.find({ _id: req.params.id }).sort({ name: 1 });
    res.json(result);
});

app.get('/donor/search', async (req, res) => {
    var username = req.body.username;
    var phoneNumber = req.body.phoneNumber;
    var location = req.body.location;
    var name = req.body.name;
    const result = await DonorClass.find({})
        .or([{ location: location }, { name: name }])
        .and([{ username: username }, { phoneNumber: phoneNumber }]);
    res.json(result);
});

app.delete('/donor/delete/:id', async (req, res) => {
    const result = await DonorClass.deleteOne({ _id: req.params.id });
    res.json(result);
})

app.put('/donor/reset', async (req, res) => {
    var password = req.body.password;
    var newPassword = req.body.newPassword;
    var confirmNewPassword = req.body.confirmNewPassword;
    const validationSchema = {
        password: validator.string().required(),
        newPassword: validator.string().required().min(7),
        confirmNewPassword: validator.string().required(),
    }
    const resultOfValidator = validator.validate(req.body, validationSchema);

    if (resultOfValidator.error)
        return res.status(400).send({
            message: resultOfValidator.error.details[0].message
        });

    const result = await DonorClass.updateOne({ password: password }, { password: newPassword }, { new: true });
    res.json(result);
});

app.listen(process.env.PORT || 3000);