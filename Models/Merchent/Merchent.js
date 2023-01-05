const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Merchent = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: [true, " Email is already exists"],
  },
  password: {
    type: String,
  },
  telefonNumber: {
    type: Number,
  },
  restPasswordToken: String,
  restPasswordExpire: Date,
});
////------------------------------------------------
Merchent.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
Merchent.methods.matchPasswords = async function (passwords) {
  return await bcrypt.compare(passwords, this.password);
};
Merchent.methods.getSigndtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Merchent_Model = mongoose.model("Merchent-data", Merchent);
module.exports = Merchent_Model;
