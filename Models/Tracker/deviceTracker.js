const mongoose = require("mongoose");

////------------------------------------------------
const deviceDetector = new mongoose.Schema({
  Customer_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer-data",
  },
  Device: {
    type: String,
  },
  os: {
    type: String,
  },
  AppOrBrowser: {
    type: Boolean,
  },
  UserUniqId: {
    type: Number,
  },
});

const deviceDetector_data = mongoose.model(
  "deviceDetector-data",
  deviceDetector
);

module.exports = deviceDetector_data;
