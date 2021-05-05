const port = process.env.PORT || 5000;
const expressFunction = require('express');
var app = expressFunction();

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/ChilikDatabase");

mongoose.connection.collection("users").find(function(err, docs,c){
    console.log(err);
    console.log(docs.toArray(c));
    
})

app.use(require("cors")())
app.use(expressFunction.json());

//Routes
app.use("/api/users", require('./routes/userRouts.js'));
app.use("/api/agents", require('./routes/agentsRouts.js'));
app.use("/api/orders", require('./routes/ordersRouts.js'));



app.listen(port, function() {
    console.log("Server is up in port: " + port);
})

