const mongoose = require("mongoose");

////------------------------------------------------

const ShopAndMerchent = new mongoose.Schema({
  Shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop_data",
  },
  Merchent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchent-data",
  },
});

////------------------------------------------------
const ShopCategory = new mongoose.Schema({
  ShopCategoryName: {
    type: String,
    trim: true,
  },
});
////------------------------------------------------
const Shop = new mongoose.Schema({
  ShopName: {
    type: String,
    trim: true,
  },
  ShopCategory_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShopCategory_data",
  },
  Street: {
    type: String,
  },
  HouseNumber: {
    type: String,
  },
  city: {
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
  Loge: {
    type: String,
  },
});
const ShopAndMerchent_Model = mongoose.model(
  "ShopAndMerchent_data",
  ShopAndMerchent
);
const ShopCategory_Model = mongoose.model("ShopCategory_data", ShopCategory);
const Shop_Model = mongoose.model("Shop_data", Shop);

module.exports = [Shop_Model, ShopAndMerchent_Model, ShopCategory_Model];
