const User = require("../model/user");
// const argon = require("argon2");
const jwt = require("jsonwebtoken");
const CONFIGS = require("../configs");
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const comparePassword =(pw, pwInDb) =>{
  if(pw && pwInDb && pw.toString() === pwInDb.toString()){
    return true
  }else{
    return false
  }
}

exports.signup = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    // const hashedPassword = await argon.hash(password);

    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    // console.log('hashedPassword',hashedPassword)

    const user = new User({
      ...req.body,
      password: password
    });

    user.save();
    res.status(200).json({
      message: "success",
      user:{
        id:user._id,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const [user] = await User.find({ email });

    if (!user) {
      const err = new Error("User Not Found!");
      err.statusCode = 404;
      throw err;
    }

    // const isEqual = await argon.verify(user.password, password);
    // const isEqual = await bcrypt.compare(password, user.password);

    const isEqual = comparePassword(password, user.password);
    console.log('isEqual', isEqual)
    
    if (!isEqual) {
      const err = new Error("Password did not match");
      err.statusCode = 401;
      throw err;
    } else {
      // console.log('addMinutes(new Date(), 30) :', addMinutes(new Date(), 30).toUTCString() , new Date().toUTCString());
      const expiryTime = Date.now(addMinutes(new Date(), CONFIGS.JWT_EXPIRE));

      // console.log("expiryTime :", new Date(expiryTime), Date.now(expiryTime));
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email
        },
        CONFIGS.JWT_SECRET,
        {
          expiresIn: expiryTime
        }
      );

      res.status(200).json({
        message: "success",
        token,
        expiryTime: expiryTime
      });
    }
  } catch (err) {
    next(err);
  }
};
