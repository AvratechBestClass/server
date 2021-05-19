const express = require('express');
const UserModel = require('../model/userSchema.js');
const crypto = require('../utils/encryptUtil.js');

// /api/users
var loginRoutes = express.Router();
loginRoutes.post("/register", function(req, res) {
    req.body.password = crypto.cryptPassword(req.body.password);
    var userModel = new UserModel(req.body);

    userModel.save(function(err, newDoc) {
        if(err) {
            return res.status(500).send();
        }
        return res.status(201).send();
    })
});

loginRoutes.post("/login", function(req, res) {

    UserModel.findOne({email: req.body.email},
         {first_name: 1, password: 1, role: 1, roleNumber: 1}, function (err, doc){
             if(err) {
                 return res.status(500).send();
             }
             console.log(doc);
             if(! doc || ! crypto.compare(req.body.password, doc.password)) {
                 // user dos'nt exists
                 return res.status(401).send({msg: "Email or passors not exists"});
             }

             const split = "=!=";
             const tokenBase = doc.first_name + split + doc.role + split + doc.roleNumber + split + req.body.email + split + doc._id; 
             const token = crypto.getEncrypt(tokenBase);
             res.status(200).send({token: token});
         })
})



module.exports = loginRoutes;