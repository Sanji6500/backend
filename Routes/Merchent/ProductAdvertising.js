const router = require("express").Router();
const [Product_Model] = require("../../Models/Merchent/Product");
const [Shop_Model] = require("../../Models/Merchent/Shop");
const errorResponse = require("../../Utils/errorResponse");
const Productadvertising_Model = require("../../Models/Merchent/ProductAdvertising");

router.post("/AddProductAdvertising", async (req, res) => {
  const {
    ShopName,
    ProductID,
    PriceAfterDiscount,
    AdvertisingStartDate,
    AdvertisingEndDate,
  } = req.body;

  const ShopID = await Shop_Model.findOne({
    ShopName: ShopName,
  }).select("_id");

  const AddProductadvertising_Model = new Productadvertising_Model({
    Shop_ID: ShopID,
    Product_ID: ProductID,
    PriceAfterDiscount: PriceAfterDiscount,
    AdvertisingStartDate: AdvertisingStartDate,
    AdvertisingEndDate: AdvertisingEndDate,
  });

  AddProductadvertising_Model.save()
    .then(() => res.json({ Success: true }))
    .catch((err) => res.status(500).json("Error code :Shark want something"));
});
////----------------------------------------------------------------------------------------
router.get("/P1:id", async (req, res) => {
  Productadvertising_Model.findById(req.params.id)
    .populate([
      {
        path: "Shop_ID",
      },
      { path: "Product_ID" },
    ])

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark want something" + err));
});
////----------------------------------------------------------------------------------------
router.patch("/:id", async (req, res) => {
  Productadvertising_Model.findById(req.params.id)
    .populate([
      {
        path: "Shop_ID",
      },
      { path: "Product_ID" },
    ])

    .then((result) => {
      Object.assign(result, req.body);
      result.save();
      res.json({ Success: true, result });
    })
    .catch((err) => res.json("Error code :Shark want something " + err));
});
////----------------------------------------------------------------------------------------
router.post("/deleteProductAdverstising", async (req, res) => {
  const { ProductNameID } = req.body;
  Product_Model.deleteOne({
    _id: ProductNameID.trim(),
  })

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark ate fish "));
});

////----------------------------------------------------------------------------------------
router.get("/Current-ads", async (req, res) => {
  let today = await new Date().toISOString();

  Productadvertising_Model.find({
    $and: [
      {
        AdvertisingStartDate: {
          $lte: today,
        },
        AdvertisingEndDate: {
          $gte: today,
        },
      },
    ],
  })

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark want something" + err));
});

////----------------------------------------------------------------------------------------
router.get("/Upcomeing-ads", async (req, res) => {
  let today = await new Date().toISOString();
  Productadvertising_Model.find({
    $and: [
      {
        AdvertisingStartDate: {
          $gt: today,
        },
      },
    ],
  })
    .populate([
      {
        path: "Shop_ID",
      },
      { path: "Product_ID" },
    ])

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark want something" + err));
});
////----------------------------------------------------------------------------------------
router.get("/Previous-Ads", async (req, res) => {
  let today = await new Date().toISOString();
  Productadvertising_Model.find({
    $and: [
      {
        AdvertisingEndDate: {
          $lt: today,
        },
      },
    ],
  })
    .populate([
      {
        path: "Shop_ID",
      },
      { path: "Product_ID" },
    ])
    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark want something" + err));
});
module.exports = router;
////----------------------------------------------------------------------------------------
