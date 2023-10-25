const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginUser = async (req, res) => {
  //   if(!req.body?.password || !req.body?.username)
  const emailOrUsername = req.body?.username || req.body?.email;
  try {
    const foundUser = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!foundUser) return res.status(404).json("User not found");

    const matchedPassword = await bcrypt.compare(
      req.body?.password,
      foundUser.password
    );

    if (!matchedPassword) return res.status(401).json("Authorization failed");

    const accessToken = jwt.sign(
      {
        id: foundUser._id,
        isAdmin: foundUser.isAdmin,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...others } = foundUser._doc;

    res.status(200).json({
      data: { ...others, accessToken },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  loginUser,
};
