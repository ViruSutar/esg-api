const express = require("express");
const app = express();



// Parse request body as JSON
app.use(express.json());

app.get("/", (req, res) => {
return res.status(200).send("Hello from server");
});


// Routes
app.use('/api',require('./Routes/ESGRoutes'))



module.exports = app;