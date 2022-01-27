const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

//Gets all items in a list
router.get('/:listId', async (req, res) => {
     try {
        const items = await Item.find({ list_id: req.params.listId });
        res.json(items);
    } catch (error) {
        res.json({ message: error });
    }
});

//Gets a single item in a list
router.get('/:listId/:itemId', async (req, res) => {
    try {
        const items = await Item.find({ list_id: req.params.listId, _id: req.params.itemId });
        res.json(items);
    } catch (error) {
        res.json({ message: error });
    }
});

//Post a new Item
router.post('/:listId', async (req, res) => {
    const item = new Item({
        list_id: req.params.listId,
        name: req.body.name,
        hyperlink: req.body.hyperlink,
        notes: req.body.notes,
        added_by: req.body.added_by
    });

    try {
        const savedItem = await item.save();
        res.json(savedItem);
    } catch (error) {
        res.json({ message: error });
    }
});

//Updates an item
router.patch('/:listId/:itemId', async (req, res) => {
    try {
        const updatedItem = await Item.updateOne(
            { _id: req.params.itemId, list_id: req.params.listId }, 
            { $set: { name: req.body.name, hyperlink: req.body.hyperlink, notes: req.body.notes } });
        res.json(updatedItem);
        console.log(updatedItem);
    } catch (error) {
        res.json({ message: error });
    }
});

//Deletes an item
router.delete('/:listId/:itemId', async (req, res) => {
    try {
        const removedItem = await Item.deleteOne({ list_id: req.params.listId, item_id: req.params.itemId });
        res.json(removedItem);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;