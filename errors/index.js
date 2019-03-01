exports.handle405 = (req, res, next) => {
  res.status(405).json({ msg: `The ${req.method} method is not allowed at this endpoint` });
};

exports.handleStatus = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.msg });
  } else next(err);
};

exports.handle400 = (err, req, res, next) => {
  if (err.code === '42703') {
    res.status(400).json({ msg: 'No matching columns' });
  } else if (err.code === '23502') {
    res.status(400).json({ msg: 'There is data missing in the body for this post' });
  } else if (err.code === '23503') {
    res
      .status(404)
      .json({ msg: 'Something doesnt exist, either the topic or the username or the article' });
  } else next(err);
};

exports.handle422 = (err, req, res, next) => {
  if (err.code === '23505') {
    const msg = err.detail;
    res.status(422).json({ msg });
  }
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).json({ msg: '......it appears we have a little problem here', err });
};

exports.handleBadUrl = (req, res, next) => {
  res.status(404).json({ msg: 'Looks like you have put in an incorrect address' });
};
