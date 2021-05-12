const port = process.env.PORT || 5000;
const expressFunction = require('express');
var app = expressFunction();

const mongoose = require('mongoose');

const dbPath = process.env.MONGO_URI || "mogodb://127.0.0.1:27017/ChilikDnatabase"
console.log(dbPath);

mongoose.connect(dbPath);

app.use(require("cors")())
app.use(expressFunction.json());

var userRoutes = require('./routes/userRouts.js');
//Routes
app.use("/api/users", userRoutes);
app.use("/api/agents", require('./routes/agentsRouts.js'));
app.use("/api/orders", require('./routes/ordersRouts.js'));



app.listen(port, function() {
    console.log("Server is up in port: " + port);
})

