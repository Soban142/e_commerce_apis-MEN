const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  if (!req.body.username && !req.body.password && !req.body.email)
    return res
      .status(401)
      .json({ message: "Username, password and email field are compulsory." });

  const emailExisted = await User.findOne({ email: req.body.email }).exec();
  if (emailExisted)
    return res
      .status(409)
      .json({ message: "email already exist", status: 409 });

  const duplicateUser = await User.findOne({
    username: req.body.username,
  }).exec();
  if (duplicateUser)
    return res.status(409).json({ message: "user already exist", status: 409 });

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const result = user;
    res.status(201).json({ data: user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
};
