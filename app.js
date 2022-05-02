const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const oauthRouter = require('./routes/oauth');
const eventRouter = require('./routes/event');
const overrideRouter = require('./routes/overrides');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/oauth', oauthRouter);
app.use('/checkout/event', eventRouter);
app.use('/overrides', overrideRouter);

module.exports = app;
