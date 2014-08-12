var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    project = require('./routes/projects'),
    user = require('./routes/users'),
    version = require('./routes/versions'),
    config = require('./config'),
    app = express(),
    dbName,
    connectionString;

//connect to our database
dbName = config.dbName;
connectionString = 'mongodb://localhost:27017/' + dbName;
 
mongoose.connect(connectionString);

//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api', project);
app.use('/api', user);
app.use('/api', version);

module.exports = app;
