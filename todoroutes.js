const router = require('express').Router();
//import todo model 
const todoItemsModel = require('../models/todomodel');


//create first route --add Todo Item to database
router.post('/api/item', async(req, res) => {
    try {
        const newItem = new todoItemsModel({
                item: req.body.item,
                date: req.body.date
            })
            //save this item in database
        const saveItem = await newItem.save()

        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json({ saveItem, allTodoItems });
        // res.status(200).json(saveItem);
    } catch (err) {
        res.json(err);
    }
})

//create second route -- get data from database
router.get('/api/items', async(req, res) => {
    try {
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems);
    } catch (err) {
        res.json(err);
    }
})


//update item
router.put('/api/item/:id', async(req, res) => {
    try {
        //find the item by its id and update it
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        // res.status(200).json(updateItem);
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json({ updateItem, allTodoItems });
    } catch (err) {
        res.json(err);
    }
})


//Delete item from database
router.delete('/api/item/:id', async(req, res) => {
    try {
        //find the item by its id and delete it
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ 'msg': 'Item Deleted', res });
    } catch (err) {
        res.json(err);
    }
})


//export router
module.exports = router;