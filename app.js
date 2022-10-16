require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const passport = require('passport');
const passportConfigs = require('./config/passport');

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

passportConfigs();

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', require('./routes/home'));
app.use('/sign-up', require('./routes/sign-up'));
app.use('/log-in', require('./routes/log-in'));
app.use('/message', require('./routes/message-form'));

app.listen(port, () => console.log(`Server started on port ${port}`));
