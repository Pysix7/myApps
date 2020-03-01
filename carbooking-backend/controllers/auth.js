exports.signup = (req, res, next) => {
  const { email, name, password } = req.body;
  console.log('req.body :', req.body);
};
