const express = require('express');
const session = require('express-session');

const db = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {},
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: db
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sync({ force: false }).then(() => {
  app.listen(PORT,() => console.log('Now listening'));
});