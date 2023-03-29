const express = require("express");
const config = require('./config/config');
const helmet = require('helmet')
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
// Routes
const wishlistRoutes = require("./routers/wishlist");

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(`/api/${config.app.API_VERSION}`, wishlistRoutes);

module.exports = app;