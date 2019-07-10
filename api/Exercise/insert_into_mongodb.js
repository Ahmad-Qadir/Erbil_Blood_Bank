
//connecting to database and creating database if database doesnt exist
var mongoose = require('mongoose');
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

//createing an object fr our class it means making and instance for my class
async function createCourse() {

    const course = new CourseClass({
        name: "Node.JS Course",
        author: "Ahmed",
        tags: ['node', 'backend'],
        isPublished: true,
    })

    const result = await course.save();
    console.log(result);
}

//using query to find this data that we want
async function getCourses() {
    const result = await CourseClass
    .find({name:"Node.JS Course",author:"Ahmed"})
    .limit(2)
    .sort({name:1})
    .select({name:1,tags:1});
    console.log(result);
}

getCourses();