const mongoose = require("mongoose");

////------------------------------------------------
const RenewableTimerTable = new mongoose.Schema({
  Advertising_ID: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: multipleRef,
  },
  multipleRef: {
    type: String,
    enum: ["Advertising_data", "ProductAdvertising_data"],
  },
  Shop_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop_data",
  },
  Date: {
    type: Date,
  },
  timePassed: {
    type: Number,
  },
});
////------------------------------------------------
const RecordTimerTable = new mongoose.Schema({
  Advertising_ID: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: multipleRef,
  },
  multipleRef: {
    type: String,
    enum: ["Advertising_data", "ProductAdvertising_data"],
  },
  Shop_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop_data",
  },
  Date: {
    type: Date,
  },
  AverageTimePassed: {
    type: Number,
  },
  MinimumValue: {
    type: Number,
  },
  MaxmumValue: {
    type: Number,
  },
});

const RenewableTimerTable_data = mongoose.model(
  "RenewableTimerTable_data",
  RenewableTimerTable
);
const RecordTimerTable_data = mongoose.model(
  "RecordTimerTable",
  RecordTimerTable
);

module.exports = [RenewableTimerTable_data, RecordTimerTable_data];
