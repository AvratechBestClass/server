const port = process.env.PORT || 5000;
const expressFunction = require('express');
var app = expressFunction();
const UserToken = require("./model/userToken");

const mongoose = require('mongoose');

const dbPath = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ChilikDatabase"
console.log(dbPath);

mongoose.connect(dbPath);

app.use(require("cors")())
app.use(expressFunction.json());

var userRoutes = require('./routes/userRouts.js');

app.use("/auth", require("./routes/loginRoutes.js"));
//Routes
app.use("/api", function(req, res, next) {
    var userToken = new UserToken(false, req.headers['x-access-token']);
    console.log(userToken);
    
    if(userToken.isNotExpired()){
        req.user = userToken;
        return next();
    }
    res.status(401).send();
});
app.use("/api/users", userRoutes);
app.use("/api/agents", require('./routes/agentsRouts.js'));
app.use("/api/orders", require('./routes/ordersRouts.js'));



app.listen(port, function() {
    console.log("Server is up in port: " + port);
})

