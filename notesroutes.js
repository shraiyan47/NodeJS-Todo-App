const router = require('express').Router();
//import todo model 
const notesModel = require('../models/notesmodel');

const ts = Date.now();
//create first route --add Todo Item to database
router.post('/api/note', async(req, res) => {
    try {
        const newNote = new notesModel({
                title: req.body.title,
                details: req.body.details,
                image: req.body.image,
                todo_tags: req.body.todo_tags,
                date: ts
            })
            //save this item in database
        const saveItem = await newNote.save()

        const allNotes = await notesModel.find({});
        res.status(200).json({ saveItem, allNotes });
        // res.status(200).json(saveItem);
    } catch (err) {
        res.json(err);
    }
})

//create second route -- get data from database
router.get('/api/notes', async(req, res) => {
    try {
        const allNotes = await notesModel.find({});
        res.status(200).json(allNotes);
    } catch (err) {
        res.json(err);
    }
})


//update item
router.put('/api/note/:id', async(req, res) => {
    try {
        //find the item by its id and update it
        const updateNote = await notesModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        // res.status(200).json(updateNote);
        const allNotes = await notesModel.find({});
        res.status(200).json({ updateNote, allNotes });
    } catch (err) {
        res.json(err);
    }
})


//Delete item from database
router.delete('/api/note/:id', async(req, res) => {
    try {
        //find the item by its id and delete it
        const deleteNote = await notesModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ 'msg': 'Note Deleted', res });
    } catch (err) {
        res.json(err);
    }
})


//export router
module.exports = router;