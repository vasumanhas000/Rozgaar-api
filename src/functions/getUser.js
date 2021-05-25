const User = require("../models/user");
const getUser = async (req, res, next) => {
  try {
    console.log(req.userId);
    const user = await User.findOne({
      uid: req.userId,
    });
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = getUser;
