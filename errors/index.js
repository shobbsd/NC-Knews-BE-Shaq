exports.handle405 = (req, res, next) => {
  res.status(405).json({ msg: `The ${req.method} method is not allowed at this endpoint` });
};
