const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter');
const {
  handleStatus, handle400, handle422, handle500, handleBadUrl,
} = require('./errors');

const app = express();

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use('/*', handleBadUrl);

app.use(handleStatus);
app.use(handle400);
app.use(handle422);
app.use(handle500);

module.exports = app;
