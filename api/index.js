var express = require('express');
var app = express();
var validator = require('joi');
require('./serverConnection');
var DonorClass = require('./collections/donors')
app.use(express.json());


app.post('/donor/insert', (req, res) => {
    const validationSchema = {
        username: validator.string().required(),
        password: validator.string().min(7),
        name: validator.string().required().lowercase(),
        phoneNumber: validator.required(),
        location: validator.required(),
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
        });
        course.save();
    }
});


app.get('/donor/shows', async (req, res) => {
    const result = await DonorClass.find({}).sort({ name: 1 });
    res.json(result);
});

app.get('/donor/search', async (req, res) => {
    var username = req.body.username;
    var phoneNumber = req.body.phoneNumber;
    var location = req.body.location;
    var name = req.body.name;
    const result = await DonorClass.find({})
        .or([{ location: location }, { name: name }])
        .and([{ username: username }, { phoneNumber: phoneNumber }])
        .sort({ name: 1 });
    res.json(result);
});

app.delete('/donor/delete', async (req, res) => {
    var username = req.body.username;
    var phoneNumber = req.body.phoneNumber;
    var email = req.body.email;
    const result = await DonorClass.deleteOne({})
        .or([{ username: username }, { phoneNumber: phoneNumber }, { email: email }]);
    res.json(result);
})



app.put('/donor/:id', async (req, res) => {
    const validationSchema = {
        author: validator.string().required(),
    }
    const resultOfValidator = validator.validate(req.body, validationSchema);

    if (resultOfValidator.error)
        return res.status(400).send({
            message: resultOfValidator.error.details[0].message
        });

    const result = await DonorClass.findByIdAndUpdate(req.params.id, { author: req.body.author }, { new: true });
    res.json(result);
});

app.listen(process.env.PORT || 3000);