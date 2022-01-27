const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { registerValidation, loginValidation } = require('../valdiation');
const verify = require('./verifyToken');

//Gets all users
router.get('/', async (req, res) => {
    try {
       const users = await User.find();
       res.json(users);
   } catch (error) {
       res.json({ message: error });
   }
});

//Post a new User
router.post('/register', async (req, res) => {
    //Valdiation
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    //Checking if user is already in DB
    const emailExists = await User.findOne({ email: req.body.email });
    if(emailExists) return res.status(400).send("Email already exists.");

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Posts the new User to DB
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.json({ user: user._id });
    } catch (error) {
        res.json({ message: error });
    }
});

//Login
router.post('/login', async (req, res) => {
    //Validates credientals
    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    
    //Checking if email exists
    const userExists = await User.findOne({ username: req.body.username });
    if(!userExists) return res.status(400).send("Email doesn't exist.");

    //Checking if password is correct
    const validPassword = await bcrypt.compare(req.body.password, userExists.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.')

    const token = jwt.sign({ _id: userExists._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

//Deletes a User
router.delete('/:userId', verify, async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({ _id: req.user._id });
        res.json(deletedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;