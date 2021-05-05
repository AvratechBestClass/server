const port = process.env.PORT || 5000;
const expressFunction = require('express');
var app = expressFunction();


app.use(require("cors")())
app.use(expressFunction.json());

//Routes
app.use("/api/users", require('./routes/userRouts.js'));
app.use("/api/agents", require('./routes/agentsRouts.js'));
app.use("/api/orders", require('./routes/ordersRouts.js'));



app.listen(port, function() {
    console.log("Server is up in port: " + port);
})

