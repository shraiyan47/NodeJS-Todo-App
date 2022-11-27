const router = require('express').Router();
//import todo model 
const notesModel = require('../models/notesmodel');
const TokenChecker = require('../TokenChecker');

const ts = Date.now();
//create first route --add Todo Item to database
router.post('/api/note', async (req, res) => {
    try {
        const theToken = req.headers.authorization;
        if (!!theToken) {
            const tokenResult = TokenChecker.TokenChecker(theToken);
            console.log("Return Token ", tokenResult);

            if (tokenResult) {
                const newNote = new notesModel({
                    title: req.body.title,
                    details: req.body.details,
                    image: req.body.image,
                    todo_tags: [req.body.todo_tags],
                    date: ts,
                    userId: tokenResult.userId
                })
                //save this item in database
                const saveItem = await newNote.save()

                const allNotes = await notesModel.find({"userId":tokenResult.userId});
                res.status(200).json({ saveItem, allNotes });
                // res.status(200).json(saveItem);

            }
            else {
                res.status(401).json({ "ErrorMsg": "Unauthorized User" })
            }
        }
        else {
            res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
        }

    } catch (err) {
        res.json(err);
    }
})

//create second route -- get data from database
router.get('/api/notes', async (req, res) => {
    try {
        const theToken = req.headers.authorization;
        if (!!theToken) {
            const tokenResult = TokenChecker.TokenChecker(theToken);
            console.log("Return Token ", tokenResult);

            if (tokenResult) {
                const allNotes = await notesModel.find({"userId":tokenResult.userId});
                res.status(200).json(allNotes);

            }
            else {
                res.status(401).json({ "ErrorMsg": "Unauthorized User" })
            }
        }
        else {
            res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
        }

    } catch (err) {
        res.json(err);
    }
})

//Get by id route 
router.get('/api/notes/:id', async (req, res) => {
    try {
        const theToken = req.headers.authorization;
        if (!!theToken) {
            const tokenResult = TokenChecker.TokenChecker(theToken);
            console.log("Return Token ", tokenResult);

            if (tokenResult) {
                const theNote = await notesModel.findById(req.params.id, {});
                res.status(200).json(theNote);

            }
            else {
                res.status(401).json({ "ErrorMsg": "Unauthorized User" })
            }
        }
        else {
            res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
        }

    } catch (err) {
        res.json(err);
    }
})


//update item
router.put('/api/note/:id', async (req, res) => {
    try {
        const theToken = req.headers.authorization;
        if (!!theToken) {
            const tokenResult = TokenChecker.TokenChecker(theToken);
            console.log("Return Token ", tokenResult);

            if (tokenResult) {

                //find the item by its id and update it
                const updateNote = await notesModel.findByIdAndUpdate(req.params.id, { $set: req.body });
                // res.status(200).json(updateNote);
                const allNotes = await notesModel.find({"userId":tokenResult.userId});
                res.status(200).json({ updateNote, allNotes });

            }
            else {
                res.status(401).json({ "ErrorMsg": "Unauthorized User" })
            }
        }
        else {
            res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
        }

    } catch (err) {
        res.json(err);
    }
})


//Delete item from database
router.delete('/api/note/:id', async (req, res) => {
    try {
        const theToken = req.headers.authorization;
        if (!!theToken) {
            const tokenResult = TokenChecker.TokenChecker(theToken);
            console.log("Return Token ", tokenResult);

            if (tokenResult) {

                //find the item by its id and delete it
                const deleteNote = await notesModel.findByIdAndDelete(req.params.id);
                res.status(200).json({ 'msg': 'Note Deleted' });

            }
            else {
                res.status(401).json({ "ErrorMsg": "Unauthorized User" })
            }
        }
        else {
            res.status(406).json({ "ErrorMsg": "Undifined Auth Token" })
        }

    } catch (err) {
        res.json(err);
    }
})


//export router
module.exports = router;