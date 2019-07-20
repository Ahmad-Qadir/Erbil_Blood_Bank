var mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    username: String,
    password: { type: String, default: Math.random().toString(36).slice(2) },
    isAdmin: { type: Boolean, default: false }
});

adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey'));
    return token;
}

const AdminClass = mongoose.model('admins', adminSchema);

module.exports = AdminClass;