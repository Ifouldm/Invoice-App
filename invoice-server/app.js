var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var invoiceRouter = require('./routes/invoiceAPI');
var wishlistRouter = require('./routes/wishlistAPI');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use('/api', invoiceRouter);
app.use('/api', wishlistRouter);
app.use(express.static(path.join(__dirname + '/public')));

module.exports = app;
