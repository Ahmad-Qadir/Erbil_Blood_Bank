var express = require('express');
var app = express();
var validator = require('joi');
var CourseClass = require('./server');
const path = require('path');
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


app.post('/insert', (req, res) => {
    const validationSchema = {
        name: validator.string().required(),
        username: validator.string().required(),
        email: validator.string().required(),
        password: validator.string()
    }
    const resultOfValidator = validator.validate(req.body, validationSchema);

    if (resultOfValidator.error) {
        res.status(400).send({
            message: resultOfValidator.error.details[0].message
        });
    } else {
        const course = new CourseClass({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        course.save();
        res.redirect('/');
    }
});
app.get('/', async (req, res) => {
    res.sendfile("C:/Users/GAhme/Documents/GitHub/Erbil_Blood_Bank/website/index.html");
});

app.get('/shows', async (req, res) => {
    const result = await CourseClass.find({});
    res.json(result);
});

app.get('/search', async (req, res) => {
    const result = await CourseClass.findById(req.query.id);
    res.json(result);
});



app.put('/:id', async (req, res) => {
    const validationSchema = {
        author: validator.string().required(),
    }
    const resultOfValidator = validator.validate(req.body, validationSchema);

    if (resultOfValidator.error)
        return res.status(400).send({
            message: resultOfValidator.error.details[0].message
        });

    const result = await CourseClass.findByIdAndUpdate(req.params.id, { author: req.body.author }, { new: true });
    res.json(result);
});

app.delete('/:id', async (req, res) => {
    const result = await CourseClass.findByIdAndDelete(req.params.id);
    res.json(result);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));