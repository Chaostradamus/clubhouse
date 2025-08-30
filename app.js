const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const pool = require('./db/pool');

require('dotenv').config();
require('./config/passport');

const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session configuration
app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'session'
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/createmessageroute'));
app.use('/', require('./routes/signuproute'));
app.use('/', require('./routes/loginroute'));
app.use('/', require('./routes/logoutroute'));
app.use('/', require('./routes/memberroute'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});