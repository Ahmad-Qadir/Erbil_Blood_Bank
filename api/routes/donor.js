var config = require("config");
var express = require('express');
var Bcrypt = require('bcryptjs');
var validator = require('joi');
var DonorClass = require('../models/donor')
const authentication = require("../middleware/auth");
const adminAuth = require("../middleware/admin");
var router = express.Router();
require('../connections/serverConnection');
router.use(express.json());


if (!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
}

//insert new Donor //Admin can use
router.post('/register', [authentication, adminAuth], async (req, res) => {
    const validationSchema = {
        username: validator.string().required().lowercase(),
        name: validator.string().required(),
        phoneNumber: validator.required(),
        location: validator.required(),
        bloodType: validator.required(),
        IDNumber: validator.required(),
        gender: validator.required(),
        employer: validator.required(),
        password: validator.required(),
        isAdmin: validator.required(),
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
                employer: req.body.employer,
                isAdmin: req.body.isAdmin
            });

            await course.save();
            res.json(course);
        }
    }
});

//show all donors   //admin can use
router.get('/shows', [authentication, adminAuth], async (req, res) => {
    const token = req.header("x-auth-token");
    res.status(401);
    const result = await DonorClass.find({}).sort({ name: 1 });
    res.json(result);
});

//show specific donor   //admin can use
router.get('/shows/:id', [authentication, adminAuth], async (req, res) => {
    const token = req.header("x-auth-token");
    res.status(401);
    var user = await DonorClass.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.send({ message: "The username doesnt exist" });
    } else {
        res.json(user);
    }
});

//delete all donors   //admin can use
router.delete('/delete/:id', [authentication, adminAuth], async (req, res) => {
    const token = req.header("x-auth-token");
    res.status(401);
    const result = await DonorClass.deleteOne({ _id: req.params.id });
    res.json(result);
})

//not work probably
router.get('/search', async (req, res) => {
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
router.put('/reset/:id', async (req, res) => {
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
router.put('/update/:id', async (req, res) => {
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
router.post("/login", async (req, res) => {

    try {
        var user = await DonorClass.findOne({ username: req.body.username }).exec();
        if (!user) {
            return res.status(400).send({ message: "The username does not exist" });
        }
        if (!Bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({ message: "The password is invalid" });
        }
        const token = user.generateAuthToken();
        res.header("x-auth-token", token).json({ message: "Correct!" });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
