const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Signup successful", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(400).json({ message: "Password is incorrect", success: false });
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      message: "Login successful",
      success: true,
      accessToken,
      refreshToken,
      email,
      name: user.name
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

const refresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token missing!", success: false });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { userId : decoded.userId },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" },
    );
    res.status(200).json({
      accessToken: newAccessToken,
    });
  }catch(err){
    res.status(401).json({message: "Invalid Refresh Token", success: false});
  }

}

module.exports = {
  login,
  signup,
  refresh,
};