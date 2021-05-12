
const UserModel = require("../model/userSchema.js");

function userController() {
    function create(req, res) {
        if(! req.body.first_name || ! req.body.date_of_birth){
            return res.status(400).send({});
        }

        var newUser = new UserModel(req.body);
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
        UserModel.deleteOne({_id: req.params._id}, function(err, result) {
            if(err){
                return res.status(500).send();
            }
            if(! result.n){
                return res.status(404).send();
            }
            return res.status(200).send();
        })
    }

    function updateUser(req, res) {
        UserModel.update({_id: req.params._id}, {$set: req.body}, function(err, result){
            if(err) {
                return res.status(500).send();
            }

            if(! result.n){
                return res.status(404).send();
            }
            res.status(200).send();

        })
    }

    function getUser (req, res) {
        UserModel.findOne({_id: req.body._id}, function(err, user){
            if(err){
                return res.status(500).send({"msg": "db problem"});
            }
            if(! user){
                return res.status(404).send();
            }
            res.status(200).send(user);
        })
    }



    function getAll(req, res) {
        UserModel.find(function(err, list){
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