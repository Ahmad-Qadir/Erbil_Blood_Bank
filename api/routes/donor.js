var express = require('express');
var app = express();
var Bcrypt = require('bcryptjs');
var validator = require('joi');
require('../connections/serverConnection');
var DonorClass = require('../models/donor')
app.use(express.json());


//insert new Donor //Admin can use
app.post('/donor/register', async (req, res) => {
    const validationSchema = {
        username: validator.string().required().lowercase(),
        name: validator.string().required(),
        phoneNumber: validator.required(),
        location: validator.required(),
        bloodType: validator.required(),
        IDNumber: validator.required(),
        gender: validator.required(),
        employer: validator.required(),
        password: validator.required()
    }
    const resultOfValidator = validator.validate(req.body, validationSchema);

    if (resultOfValidator.error) {
        res.status(400).send({
            message: resultOfValidator.error.details[0].message
        });
    } else {
        req.body.password = Bcrypt.hashSync(req.body.password, Bcrypt.genSaltSync(10));
        var user = await DonorClass.findOne({ username: req.body.username }).exec();
        if (user) {
            return res.send({ message: "The username exist" });
        } else {
            const course = new DonorClass({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                location: req.body.location,
                points: req.body.points,
                birthdate: req.body.birthdate,
                IDNumber: req.body.IDNumber,
                gender: req.body.gender,
                latestDateofDonation: req.body.latestDateofDonation,
                bloodType: req.body.bloodType,
                testDate: req.body.testDate,
                employer: req.body.employer
            });
            await course.save();
            res.json(course);
        }
    }
});

//show all donors   //admin can use
app.get('/donor/shows', async (req, res) => {
    const result = await DonorClass.find({}).sort({ name: 1 });
    res.json(result);
});

//show all donors   //admin can use
app.get('/donor/shows/:id', async (req, res) => {
    const result = await DonorClass.find({ _id: req.params.id });
    res.json(result);
});

//show all donors   //admin and donors can use
app.delete('/donor/delete/:id', async (req, res) => {
    const result = await DonorClass.deleteOne({ _id: req.params.id });
    res.json(result);
})

//not work probably
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

//update password of donor //donors can use
app.put('/donor/reset/:id', async (req, res) => {
    var newPassword = req.body.newPassword;
    var confirmNewPassword = req.body.confirmNewPassword;
    const validationSchema = {
        newPassword: validator.string().required().min(7),
        confirmNewPassword: validator.string().required().min(7),
    }
    const resultOfValidator = validator.validate(req.body, validationSchema);

    if (resultOfValidator.error)
        return res.status(400).send({
            message: resultOfValidator.error.details[0].message
        });

    if (newPassword !== confirmNewPassword) {
        res.json({ message: "password is not same" })
    } else {
        newPassword = Bcrypt.hashSync(newPassword, Bcrypt.genSaltSync(10));
        const donorNewPassword = await DonorClass.findByIdAndUpdate({ _id: req.params.id }, { password: newPassword });
        res.json({
            message: "Your Password Updated Succesfully"
        });
    }
});

//update profile of donor   //admin and donors can use
app.put('/donor/update/:id', async (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phoneNumber = req.body.phoneNumber;
    var location = req.body.location;
    var birthdate = req.body.birthdate;
    var gender = req.body.gender;
    var bloodType = req.body.bloodType;
    const validationSchema = {
        name: validator.string().required(),
        phoneNumber: validator.required(),
        location: validator.required(),
        bloodType: validator.required(),
        birthdate: validator.required(),
        gender: validator.required(),
        employer: validator.required(),
    }
    const resultOfValidator = validator.validate(req.body, validationSchema);

    if (resultOfValidator.error)
        return res.status(400).send({
            message: resultOfValidator.error.details[0].message
        });

    await DonorClass.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            location: location,
            birthdate: birthdate,
            gender: gender,
            bloodType: bloodType
        }
    }, { new: true });
    res.json({
        message: "Your informations Updated Succesfully"
    });
});

//donor login          //donor can use
app.post("/donor/login", async (req, res) => {
    try {
        var user = await DonorClass.findOne({ username: req.body.username }).exec();
        if (!user) {
            return res.status(400).send({ message: "The username does not exist" });
        }
        if (!Bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({ message: "The password is invalid" });
        }
        res.send({ message: "correct!" });
    } catch (error) {
        res.status(500).send(error);
    }
});


//authentication 

app.listen(process.env.PORT || 3000);