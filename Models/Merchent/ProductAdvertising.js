const mongoose = require("mongoose");

////------------------------------------------------
const Productadvertising = new mongoose.Schema({
  Product_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product_data",
  },
  Shop_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop_data",
  },
  PriceAfterDiscount: {
    type: Number,
  },
  AdvertisingStartDate: {
    type: Date,
  },
  AdvertisingEndDate: {
    type: Date,
  },
});

const Productadvertising_data = mongoose.model(
  "ProductAdvertising_data",
  Productadvertising
);

module.exports = Productadvertising_data;
