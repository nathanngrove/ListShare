const express = require('express');
const router = express.Router();

const verify = require('./verifyToken');
const List = require('../models/List');

//Get all lists
router.get('/', verify, async (req, res) => {
    try {
        const lists = await List.find({ _id: req.user._id });
        res.json(lists);
    } catch (error) {
        res.json({ message: error });
    }
});

//Post a new List
router.post('/', verify, async (req, res) => {
    const list = new List({
        created_by: req.user._id,
        title: req.body.title,
    });

    try {
        const savedList = await list.save();
        res.json(savedList);
    } catch (error) {
        res.json({ message: error });
    }
});



module.exports = router;