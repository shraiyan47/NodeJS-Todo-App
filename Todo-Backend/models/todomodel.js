//import mongoose to create mongoose model
const mongoose = require('mongoose');

//create Schema
const TodoItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    complete: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
}, { collection: 'todos' })

//export this Schema

module.exports = mongoose.model('todoShop', TodoItemSchema);