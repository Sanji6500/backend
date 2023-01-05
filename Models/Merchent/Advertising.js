const mongoose = require("mongoose");

////------------------------------------------------
const Advertising = new mongoose.Schema({
  Shop_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop_data",
  },

  ProductID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product_data",
  },

  AdvertisingStartDate: { type: Date },
  AdvertisingEndDate: { type: Date },
  PriceBefordiscount: { type: Number },
  PriceAfterDiscount: { type: Number },
});

const Advertising_data = mongoose.model("Advertising_data", Advertising);

module.exports = Advertising_data;
