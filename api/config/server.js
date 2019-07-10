const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/EmployeeDB';
mongoose.connect(url, { useNewUrlParser: true });