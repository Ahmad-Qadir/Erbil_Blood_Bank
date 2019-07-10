var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();

//to work with paths
require('./config/server');

//inserting data
app.post('/post-feedback', function (req, res) {
    var conn = mongoose.connection;
    var user = {
        name: 'abc'
    };
    conn.collection('customers').insertOne(user);
    console.log("Data Inserted");
    res.redirect('/');
});

//opening and directing main page to anypage u want
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(process.env.PORT || 3000);