const router = require("express").Router();

const [Shop_Model] = require("../../Models/Merchent/Shop");
const errorResponse = require("../../Utils/errorResponse");
const Advertising_Model = require("../../Models/Merchent/Advertising");
const [
  HauptCategory_Model,
  SubCategory_Model,
  Product_Model,
] = require("../../Models/Merchent/Product");

router.post("/AddProductAdvertising", async (req, res) => {
  const {
    ShopName,
    ProductName,
    AdvertisingStartDate,
    AdvertisingEndDate,
    PriceBefordiscount,
    PriceAfterDiscount,
  } = req.body;

  const ShopID = await Shop_Model.findOne({
    ShopName: ShopName,
  }).select("_id");

  const ProductID = await Product_Model.findOne({
    ProductName: ProductName,
  }).select("_id");

  const AddAdvertising_Model = new Advertising_Model({
    Shop_ID: ShopID,
    ProductID: ProductID,

    AdvertisingStartDate: AdvertisingStartDate,
    AdvertisingEndDate: AdvertisingEndDate,
    PriceBefordiscount: PriceBefordiscount,
    PriceAfterDiscount: PriceAfterDiscount,
  });

  AddAdvertising_Model.save()
    .then(() => res.json({ Success: true }))
    .catch((err) =>
      res.status(500).json("Error code :Shark want something big ")
    );
});
////----------------------------------------------------------------------------------------
router.get("/", async (req, res) => {
  Advertising_Model.find()
    .populate([
      {
        path: "Shop_ID",
        select: "ShopName",
      },
    ])
    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark want something big" + err));
});

////----------------------------------------------------------------------------------------
router.get("/P1:id", async (req, res) => {
  Advertising_Model.findById(req.params.id)
    .populate([
      {
        path: "Shop_ID",
        select: "ShopName",
      },
    ])
    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark want something big" + err));
});

////----------------------------------------------------------------------------------------
router.patch("/:id", async (req, res) => {
  Advertising_Model.findById(req.params.id)
    .populate([
      {
        path: "Shop_ID",
        select: "ShopName",
      },
    ])

    .then((result) => {
      Object.assign(result, req.body);
      result.save();
      res.json({ Success: true, result });
    })
    .catch((err) => res.json("Error code :Shark want something big" + err));
});

////----------------------------------------------------------------------------------------
router.post("/deleteProductAdverstising", async (req, res) => {
  const { ProductNameID } = req.body;
  Advertising_Model.deleteOne({
    _id: ProductNameID.trim(),
  })

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark want something big"));
});
////----------------------------------------------------------------------------------------
router.get("/Current-ads", async (req, res) => {
  let today = await new Date().toISOString();

  Advertising_Model.find({
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
    .populate([
      {
        path: "ProductID",
        populate: { path: "SubCategory_ID" },
      },
      { path: "Shop_ID" },
    ])

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark want something" + err));
});

////----------------------------------------------------------------------------------------
router.get("/All-ads", async (req, res) => {
  Advertising_Model.find()
    .populate([
      {
        path: "ProductID",
        select: "ProductName",
      },
    ])

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark want something" + err));
});

////----------------------------------------------------------------------------------------
router.get("/Upcomeing-ads", async (req, res) => {
  let today = await new Date().toISOString();
  Advertising_Model.find({
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
        select: "ShopName",
      },
    ])

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark want something" + err));
});
////----------------------------------------------------------------------------------------
router.get("/Previous-Ads", async (req, res) => {
  let today = await new Date().toISOString();
  Advertising_Model.find({
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
    ])
    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark want something" + err));
});

module.exports = router;
////----------------------------------------------------------------------------------------
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  Advertising_Model.findByIdAndUpdate(id, update, function (err, user) {
    if (err) return res.send(err);
  });

  res.json({ Success: true });
});
