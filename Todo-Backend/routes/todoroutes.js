const router = require('express').Router();
//import todo model 
const todoItemsModel = require('../models/todomodel');
const TokenChecker = require('../TokenChecker');

const ts = Date.now();

//create first route --add Todo Item to database
router.post('/api/item', async (req, res) => {
    try {
        const theToken = req.headers.authorization;
        if (!!theToken) {
            const tokenResult = TokenChecker.TokenChecker(theToken);
            console.log("Return Token ", tokenResult);

            if (tokenResult) {

                const newItem = new todoItemsModel({
                    item: req.body.item,
                    date: ts,
                    complete: false,
                    userId: tokenResult.userId
                })
                //save this item in database
                const saveItem = await newItem.save()

                const allTodoItems = await todoItemsModel.find({"userId":tokenResult.userId});
                res.status(200).json({ saveItem, allTodoItems });
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

// get All Item from database
router.get('/api/items', async (req, res) => {
    try {
        const theToken = req.headers.authorization;
        if (!!theToken) {
            const tokenResult = TokenChecker.TokenChecker(theToken);
            console.log("Return Token ", tokenResult);

            if (tokenResult) {

                const allTodoItems = await todoItemsModel.find({"userId":tokenResult.userId});
                res.status(200).json(allTodoItems);

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
router.get('/api/items/:id', async (req, res) => {
    try {
        const theToken = req.headers.authorization;
        if (!!theToken) {
            const tokenResult = TokenChecker.TokenChecker(theToken);
            console.log("Return Token ", tokenResult);

            if (tokenResult) {
                const theTodo = await todoItemsModel.findById(req.params.id, {});
                res.status(200).json(theTodo);
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
router.put('/api/item/:id', async (req, res) => {
    try {

        const theToken = req.headers.authorization;
        if (!!theToken) {
            const tokenResult = TokenChecker.TokenChecker(theToken);
            console.log("Return Token ", tokenResult);

            if (tokenResult) {

                //find the item by its id and update it
                const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, { $set: req.body });
                // res.status(200).json(updateItem);
                const allTodoItems = await todoItemsModel.find({"userId":tokenResult.userId});
                res.status(200).json({ updateItem, allTodoItems });

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
router.delete('/api/item/:id', async (req, res) => {
    try {
        const theToken = req.headers.authorization;
        if (!!theToken) {
            const tokenResult = TokenChecker.TokenChecker(theToken);
            console.log("Return Token ", tokenResult);

            if (tokenResult) {
                //find the item by its id and delete it
                const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
                res.status(200).json({ 'msg': 'Item Deleted' });

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