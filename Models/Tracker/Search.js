const mongoose = require("mongoose");

////------------------------------------------------
const RenewableSearchTable = new mongoose.Schema({
  SuggestionsName: {
    type: String,
    trim: true,
  },
  Date: {
    type: Date,
  },
  type: {
    type: String,
    trim: true,
  },
});

const RecordSearchTable = new mongoose.Schema({
  SuggestionsName: {
    type: String,
    trim: true,
  },
  Date: {
    type: Date,
  },
  type: {
    type: String,
    trim: true,
  },
  SearchCounter: {
    type: Number,
  },
});

const RenewableSearchTable_data = mongoose.model(
  "RenewableSearchTable_data",
  RenewableSearchTable
);
const RecordSearchTable_data = mongoose.model(
  "RecordSearchTable_data",
  RecordSearchTable
);

module.exports = [RenewableSearchTable_data, RecordSearchTable_data];
