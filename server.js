const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

// express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// parse application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// api routes
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});