const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },

    date_of_birth: {
        type: Date
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: Number
    },
    roleName: {
        type: String
    }
});

module.exports = mongoose.model("client", userSchema);