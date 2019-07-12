var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('connected succsessfully'))
    .catch(() => console.log('could not connect to database'));


const courseSchema = new mongoose.Schema({
    _id: { type: Number, default: Math.floor(100000 + Math.random() * 900000)},
    name: String,
    username: String,
    email: String,
    password: { type: String, default: Math.random().toString(36).slice(2) },
});


const CourseClass = mongoose.model('Course', courseSchema);


module.exports = CourseClass;