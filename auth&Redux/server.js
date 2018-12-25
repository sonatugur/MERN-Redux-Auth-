const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const users = require("./routes/api/users");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const db = require("./config/keys").mongoURI;

mongoose.connect(db,{useNewUrlParser:true}).then(() => console.log('connected to mongodb')).catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));