const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());

//port
const PORT = process.env.PORT || 5000;

// import routes
const todoItemRoute = require('./routes/todoroutes');
const noteRoute = require('./routes/notesroutes');

// Connect MongoDB
mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("DB Conn Succ"))
    .catch(err => console.log(err))


app.use('/', todoItemRoute);
app.use('/', noteRoute);




//add port and connect to server
app.listen(PORT, () => console.log("Server connected"));