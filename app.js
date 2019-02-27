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
  if (err.status) {
    res.status(err.status).json({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === '42703') {
    res.status(400).json({ msg: 'No matching columns' });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === '23502') {
    res.status(400).json({ msg: 'There is data missing in the body for this post' });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === '23503') {
    res.status(400).json({ msg: 'Either the topic or the username does not exist' });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === '23505') {
    // console.log(err); The console.log would log the error
    const msg = err.detail;
    res.status(422).json({ msg });
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ msg: '......it appears we have a little problem here', err });
});

module.exports = app;
