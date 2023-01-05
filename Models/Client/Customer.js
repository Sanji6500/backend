const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Customer = new mongoose.Schema({
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
  Street: {
    type: String,
  },
  HauseNummber: {
    type: String,
  },
  City: {
    type: String,
  },
  State: {
    type: String,
  },
  ZipCode: {
    type: Number,
  },
  ShopTelefon: {
    type: String,
  },
  GoogleMapPoint: {
    type: String,
  },

  UserUniqId: {
    type: Number,
  },
  restPasswordToken: String,
  restPasswordExpire: Date,
});
////------------------------------------------------
Customer.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
Customer.methods.matchPasswords = async function (passwords) {
  return await bcrypt.compare(passwords, this.password);
};
Customer.methods.getSigndtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Customer_Model = mongoose.model("Customer-data", Customer);
module.exports = Customer_Model;
