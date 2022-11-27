const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors');
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//port
const PORT = process.env.PORT || 5000;

// import routes
const todoItemRoute = require('./routes/todoroutes');
const noteRoute = require('./routes/notesroutes');
const userRoute = require('./routes/userroutes');

// Connect MongoDB
mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("DB Conn Succ"))
    .catch(err => console.log(err))


app.use('/', todoItemRoute);
app.use('/', noteRoute);
app.use('/', userRoute);




//add port and connect to server
app.listen(PORT, () => console.log("Server connected"));