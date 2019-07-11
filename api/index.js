
var mongoose = require('mongoose');             //for connection
var express = require('express');               //for manupulation
var Joi = require('joi');                       //for validation
var app = express();                            //object of Class Express
app.use(express.json());                        //use to get and post JSON file
var body = app.listen(process.env.PORT || 3000);//open port gate for use

//connecting to database and creating database if database doesnt exist
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('connected succsessfully'))
    .catch(() => console.log('could not connect to database'));


//make a structure to ur database
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});


//make a class for this scheme 
const CourseClass = mongoose.model('Course', courseSchema);


//inserting data
app.post('/insert', (req, res) => {
    createCourse(req, res);
});

//showing data
app.get('/show', (req, res) => {
    getCourses(res);
});





//createing an object fr our class it means making and instance for my class
async function createCourse(req, res) {
    const validationSchema = {
        name: Joi.string().min(3).required(),
    }
    const result = Joi.validate(req.body, validationSchema);

    if (result.error) {
        res.status(400).send("Error Occured");
    } else {
        const course = new CourseClass({
            name: req.body.name,
            author: "Ahmed",
            tags: ['node', 'backend'],
            isPublished: true,
        })
        course.save();
        res.send("Data inserted");
    }
}

//using query to find this data that we want
async function getCourses(res) {
    const result = await CourseClass.find({});
    res.json(result);
    console.log("Data shown");
}