const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter');

const app = express();

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  if (+err.code === 42703) res.status(400).json({ msg: 'incorrect data within the body', err });
});

module.exports = app;
