const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    orderHistory: [String]
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;