const mongoose = require("mongoose");

////------------------------------------------------
const HauptCategory = new mongoose.Schema({
  categoryNameBasic: {
    type: String,
    trim: true,
  },
});
////------------------------------------------------

const SubCategory = new mongoose.Schema({
  HauptCategory_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HauptCategory_data",
    required: true,
  },
  SubCategoryName: {
    type: String,
    trim: true,
  },
});

////------------------------------------------------
const Product = new mongoose.Schema({
  SubCategory_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory_data",
  },
  Shop_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop_data",
  },
  Suggestions_ID: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Suggestions_data",
  },
  ProductName: {
    type: String,
  },
  Price: {
    type: Number,
  },

  Link: {
    type: String,
  },
  infos: {
    type: String,
  },
  Unit: {
    type: String,
  },
  ProductBarcode: {
    type: Number,
  },
  Photos: {
    type: [String],
  },
});

const HauptCategory_Model = mongoose.model("HauptCategory_data", HauptCategory);
const SubCategory_Model = mongoose.model("SubCategory_data", SubCategory);
const Product_Model = mongoose.model("Product_data", Product);

module.exports = [HauptCategory_Model, SubCategory_Model, Product_Model];
