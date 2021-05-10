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
    }
});

module.exports = mongoose.model("user", userSchema);