var mongoose = require('mongoose');             //for connection
var express = require('express');               //for manupulation
var Joi = require('joi');                       //for validation
var app = express();                            //object of Class Express
app.use(express.json());                        //use to get and post JSON file
app.listen(process.env.PORT || 3000);           //open port gate for use


//connecting to database and creating database if database doesnt exist
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('connected succsessfully'))
    .catch(() => console.log('could not connect to database'));

//first time after runing server this folder will be open
//app.use(express.static('TestFolder'));

//make a structure to ur database
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});


//make a class for this scheme 
const CourseClass = mongoose.model('Course', courseSchema);

//inserting data
app.post('/insert', (req, res) => {
    createCourse(req, res);
});

//showing data with query
app.get('/shows/:author/', (req, res) => {
    var data = req.params.author;
    getCourses(res, data);
});


//showing all datas
app.get('/shows/', (req, res) => {
    var data = req.params.author;
    getCourses(res, data);
});



//createing an object fr our class it means making and instance for my class
async function createCourse(req, res) {
    //validate your schema 
    const validationSchema = {
        _id: Joi.string(),
        name: Joi.string().min(3).required(),
        author: Joi.string().required(),
        tags: Joi.array().required(),
        date: Joi.date(),
        isPublished: Joi.boolean(),
        price: Joi.number(),
    }
    const result = Joi.validate(req.body, validationSchema);

    if (result.error) {
        res.status(400).send({
            message: result.error.details[0].message
        });
    } else {
        //get all datas from JSON file in POSTMAN body 
        const course = new CourseClass({
            name: req.body.name,
            author: req.body.author,
            date: req.body.data,
            tags: req.body.tags,
            isPublished: req.body.isPublished,
            price: req.body.price
        });
        course.save();
        res.send(course);
    }
}

//using query to find this data that we want
async function getCourses(res, data) {
    if (!data) {
        const result = await CourseClass
        .find({tags:"backend",isPublished:true})
        .sort({name:1})
        .select({name:1,author:1});
        res.json(result);
    } else {
        const result = await CourseClass.find({ author: data });
        res.json(result);
    }
}