const express = require('express');
const UserModel = require('../model/userSchema.js');
const crypto = require('../utils/encryptUtil.js');
const UserToken = require('../model/userToken');

// /api/users
var loginRoutes = express.Router();
loginRoutes.post("/register", function(req, res) {
    req.body.password = crypto.cryptPassword(req.body.password);
    var userModel = new UserModel(req.body);

    userModel.save(function(err, newDoc) {
        if(err) {
            console.log(err);
            
            return res.status(500).send();
        }
        return res.status(201).send();
    })
});

loginRoutes.post("/login", function(req, res) {

    UserModel.findOne({email: req.body.email},
         {first_name: 1, password: 1, role: 1, roleNumber: 1, email: 1 }, function (err, doc){
             if(err) {
                 return res.status(500).send();
             }
             console.log(doc);
             if(! doc || ! crypto.compare(req.body.password, doc.password)) {
                 // user dos'nt exists
                 return res.status(401).send({msg: "Email or passors not exists"});
             }
             var userToken = new UserToken(true, null,
                 doc.first_name, doc._id, doc.role, doc.roleNumber, doc.email,
                Date.now() + (60 * 1000 * 60));
             res.status(200).send({token: userToken.token, email: doc.email, roleNumber: doc.roleNumber});
         })
})



module.exports = loginRoutes;