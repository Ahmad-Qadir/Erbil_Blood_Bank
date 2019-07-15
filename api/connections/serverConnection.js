var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('connected succsessfully'))
    .catch(() => console.log('could not connect to database'));