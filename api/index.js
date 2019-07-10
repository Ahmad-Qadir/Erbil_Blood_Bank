
var mongoose = require('mongoose');
var express = require('express');
var app = express();
app.use(express.json());
var body = app.listen(process.env.PORT || 3000);

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
    createCourse(req);
});

//showing data
app.get('/show', (req, res) => {
    getCourses(res);
});





//createing an object fr our class it means making and instance for my class
async function createCourse(req) {
    const course = new CourseClass({
        name: req.body.name,
        author: "Ahmed",
        tags: ['node', 'backend'],
        isPublished: true,
    })
    const result = await course.save();
    console.log("data has been inserted ");
}

//using query to find this data that we want
async function getCourses(res) {
    const result = await CourseClass.find({});
    res.json(result);
    console.log("Data showen");
}