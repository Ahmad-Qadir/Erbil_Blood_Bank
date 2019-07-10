var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
require('./config/server');

//to get data from html and send into database
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


//inserting data
app.post('/post-feedback', function (req, res) {
    var conn = mongoose.connection;
    var user = {
        _id:req.body.ids,
        name: req.body.personname,
    };
    
    conn.collection('customers').insertOne(user);
    console.log("Data Inserted");
    res.redirect('/');
});

//opening and directing main page to anypage u want
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});



const port = process.env.PORT || 3000;
app.listen(port);