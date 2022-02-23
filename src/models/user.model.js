
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String, required: true, unique: true},
    roles: [{type: String}]
},
{versionKey: false},
{ timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;