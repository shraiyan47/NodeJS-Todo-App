//import mongoose to create mongoose model
const mongoose = require('mongoose');

//create Schema
const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    todo_tags: {
        type: Array
    },
    date: {
        type: Date,
    },
    userId: {
        type: String,
        required: true
    },
}, { collection: 'notes' })

//export this Schema

module.exports = mongoose.model('note', NoteSchema);