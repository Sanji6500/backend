const mongoose = require("mongoose");

////------------------------------------------------

const Suggestions = new mongoose.Schema({
  SuggestionsName: {
    type: String,
    trim: true,
  },
});
const SuggestionsMarkt = new mongoose.Schema({
  SuggestionsMarktName: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
});

const Suggestions_Model = mongoose.model("Suggestions_data", Suggestions);
const SuggestionsMarkt_Model = mongoose.model(
  "SuggestionsMarkt_data",
  SuggestionsMarkt
);

module.exports = [Suggestions_Model, SuggestionsMarkt_Model];
