const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter');

const app = express();

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use('/*', (req, res, next) => {
  res.status(404).json({ msg: 'Looks like you have put in an incorrect address' });
});

app.use((err, req, res, next) => {
  if (+err.code === 42703) res.status(400).json({ msg: 'incorrect data within the body', err });
  else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).json({ msg: '......it appears we have a little problem here', err });
});

module.exports = app;
