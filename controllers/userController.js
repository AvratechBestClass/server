
const UserSchema = require("../model/userSchema.js");

function userController() {
    function create(req, res) {
        if(! req.body.first_name || ! req.body.date_of_birth){
            return res.status(400).send({});
        }

        var newUser = new UserSchema(req.body);
        newUser.save(function(err, newDoc){
            if(err){
                var msg = "";
                if(err.code == 11000){
                    msg = "User already exists";
                }
                return res.status(500).send({msg});
            }
            res.status(201).send(newDoc);
        })

    }

    function deleteUser(req, res) {

    }

    function updateUser(req, res) {

    }

    function getUser (req, res) {

    }

    function getAll(req, res) {
        UserSchema.find(function(err, list){
            if(err){
                return res.status(500).send({});
            }
            return res.status(200).send(list);
        })
    }

    return {
        getUser: getUser,
        updateUser: updateUser,
        create: create,
        deleteUser: deleteUser,
        getAll
    }
}

module.exports = userController()