const express = require('express');
const router = express.Router();

const verify = require('./verifyToken');
const List = require('../models/List');

//Get all lists
router.get('/', async (req, res) => {
    try {
        const lists = await List.find({ created_by: req.body.user }); //req.user._id
        res.json(lists);
    } catch (error) {
        res.json({ message: error });
    }
});

//Posts a new List
router.post('/', async (req, res) => {
    const list = new List({
        created_by: req.body.user, //req.user._id
        title: req.body.title,
    });

    try {
        const savedList = await list.save();
        res.json(savedList);
    } catch (error) {
        res.json({ message: error });
    }
});

//Adds a new Item
router.patch('/:listId/new-item', async (req, res) => {
    try {
        const newItem = {
            item_name: req.body.item_name,
            https: req.body.https,
            description: req.body.description,
            item_author: req.body.item_author
        };
        const updatedList = await List.updateOne({ _id: req.params.listId },
            {$push: {items: newItem}});
        res.json(updatedList);
    } catch (error) {
        res.json({ message: error });
    }
});



module.exports = router;