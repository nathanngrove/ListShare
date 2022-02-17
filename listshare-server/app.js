const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const app = express();

//Import routes
const usersRoute = require('./routes/users');
const listsRoute = require('./routes/lists');

//Middlewares
app.use(express.json());
app.use(cors());
app.use('/lists', listsRoute);
app.use('/users', usersRoute);

app.get('/', (req,res) => {
    res.send("We are home");
});

mongoose.connect(process.env.DB_URI, () => console.log("Connected to DB!"));

app.listen(3000);