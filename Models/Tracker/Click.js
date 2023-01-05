const mongoose = require("mongoose");

////------------------------------------------------
const RenewableVistTable = new mongoose.Schema({
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
  VistCounter: {
    type: Number,
  },
});

const RecordVistTable = new mongoose.Schema({
  Advertising_ID: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "multipleRef",
  },
  multipleRef: {
    type: String,
    enum: ["Advertising_data", "ProductAdvertising_data"],
  },
  Date: {
    type: Date,
  },
  VistCounter: {
    type: Number,
  },
});

const RenewableVistTable_data = mongoose.model(
  "RenewableVistTable_data",
  RenewableVistTable
);
const RecordVistTable_data = mongoose.model(
  "RecordVistTable_data",
  RecordVistTable
);

module.exports = [RenewableVistTable_data, RecordVistTable_data];
