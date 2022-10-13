require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const passport = require('passport');

connectDB();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/login'));

app.listen(port, () => console.log(`Server started on port ${port}`));
