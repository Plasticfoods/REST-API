require('dotenv').config()

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const indexRouter = require('./routes/indexRouter.js');
const usersRouter = require('./routes/usersRouter.js');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => console.error(err.message()));
db.once('open', () => console.log('Connected to Database'));


app.use(express.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>  console.log('Server running on 5000'));