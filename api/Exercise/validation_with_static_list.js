
var express = require('express');
var Joi = require('joi');
var app = express();
app.use(express.json());

const data = [
    { id: 7, name: "Ahmed" },
    { id: 1, name: "Muhammad" }

]

app.get('/', (req, res) => {
    res.status(200).send(data);
});

app.post('/insert', (req, res) => {

    //use to validate ur inserted data
    const schema = {
        name: Joi.string().min(3).required(),
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(error.details[1].message);
    }

    const user = {
        id: data.length + 1,
        name: req.body.name,
    }
    data.push(user);
    res.send('Data insetted');
});


app.listen(3000);