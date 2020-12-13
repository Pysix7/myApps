const User = require("../model/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const CONFIGS = require("../configs");

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

exports.signup = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const [userExists] = await User.find({ username });

    if (userExists) {
      const err = new Error("User Already exists!");
      err.statusCode = 404;
      throw err;
    }

    const hashedPassword = await argon2.hash(password);
    const user = new User({
      ...req.body,
      password: hashedPassword
    });

    user.save();
    res.status(200).json({
      message: "success",
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const [user] = await User.find({ username });

    if (!user) {
      const err = new Error("User Not Found!");
      err.statusCode = 404;
      throw err;
    }

    const isEqual = await argon2.verify(user.password, password);

    if (!isEqual) {
      const err = new Error("Password did not match");
      err.statusCode = 401;
      throw err;
    } else {
      const exp = +CONFIGS.JWT_EXPIRE * 60;
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username
        },
        CONFIGS.JWT_SECRET,
        {
          expiresIn: exp
        }
      );

      res.status(200).json({
        message: "success",
        token
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    if (req.tokenData) {
      const { username } = req.tokenData;
      const [user] = await User.find({ username });
      if (!user) {
        const err = new Error("User Not Found!");
        err.statusCode = 404;
        throw err;
      }
      delete user.password;

      res.status(200).json({
        username: user.username,
        email: user.email,
        id: user._id
      });
    }
  } catch (err) {
    next(err);
  }
}