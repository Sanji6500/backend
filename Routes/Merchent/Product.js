const router = require("express").Router();
const fs = require("fs");
const [
  HauptCategory_Model,
  SubCategory_Model,
  Product_Model,
] = require("../../Models/Merchent/Product");

const [Shop_Model] = require("../../Models/Merchent/Shop");
const [Suggestions_Model] = require("../../Models/Tracker/Suggestions");

const errorResponse = require("../../Utils/errorResponse");
const upload = require("../../Middleware/Upload");
const mongoose = require("mongoose");

router.post("/AddHauptCategory", async (req, res) => {
  const { categoryNameBasic } = req.body;
  const Result = await HauptCategory_Model.findOne({
    categoryNameBasic: categoryNameBasic,
  });

  if (!Result) {
    const AddHauptCategory_Model = new HauptCategory_Model({
      categoryNameBasic: categoryNameBasic,
    });
    AddHauptCategory_Model.save()
      .then(() => res.json({ Success: true }))
      .catch((err) => res.status(500).json("Error code :Shark has fish "));
  } else
    return res
      .status(400)
      .json({ Message: " The Haupt Category already exists", success: false });
});
////----------------------------------------------------------------------------------------
router.post("/AddSubCategory", async (req, res) => {
  const { SubCategoryName, HauptCategoryID } = req.body;

  const Result = await SubCategory_Model.findOne({
    SubCategoryName: SubCategoryName,
  });

  if (!Result) {
    const AddSubCategory_Model = new SubCategory_Model({
      SubCategoryName: SubCategoryName,
      HauptCategory_ID: mongoose.Types.ObjectId(HauptCategoryID.trim()),
    });

    AddSubCategory_Model.save()
      .then(() => res.json({ Success: true }))
      .catch((err) =>
        res.status(500).json("Error code :Shark has fish " + err)
      );
  } else
    return res
      .status(400)
      .json({ Message: " Sub Category already exists", success: false });
});

////----------------------------------------------------------------------------------------

router.post(
  "/AddProduct",
  upload.upload.single("ImagePath"),
  async (req, res) => {
    const {
      shopName,
      subCategoryName,
      ProductName,
      Link,
      unit,
      infos,
      ProductBarcode,
      Price,
      suggestName,
    } = req.body;

    const SubCategoryID = await SubCategory_Model.findOne({
      SubCategoryName: subCategoryName,
    }).select("_id");

    const Shopid = await Shop_Model.findOne({
      ShopName: shopName,
    }).select("_id");

    const SuggestID = await Suggestions_Model.findOne({
      SuggestionsName: suggestName,
    }).select("_id");

    const Checkproduct = await Product_Model.findOne({
      $or: [{ ProductName: ProductName }, { ProductBarcode: ProductBarcode }],
    });

    if (Checkproduct) {
      fs.unlink(req.file.path, function (err) {
        if (err) return console.log(err);
      });
      return res.json({ Message: " Product already exists", Success: false });
    }

    const addProduct_Model = new Product_Model({
      SubCategory_ID: SubCategoryID,
      Shop_ID: Shopid,
      ProductName: ProductName,
      Link: Link,
      Unit: unit,
      infos: infos,
      ProductBarcode: ProductBarcode,
      Photos: req.file.path,
      Price: Price,
      Suggestions_ID: SuggestID,
    });
    addProduct_Model
      .save()
      .then(() => res.json({ Success: true }))
      .catch((err) => {
        fs.unlink(req.file.path, function (err) {
          if (err) return console.log(err);
        });
        res.json("Error code :Shark has fish " + err);
      });
  }
);
////----------------------------------------------------------------------------------------
router.get("/Allproducts", async (req, res) => {
  Product_Model.find()
    .populate([
      {
        path: "SubCategory_ID",
        populate: {
          path: "HauptCategory_ID",
        },
      },
      { path: "Shop_ID" },
      { path: "Suggestions_ID" },
    ])

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark around all fishs " + err));
});
////----------------------------------------------------------------------------------------
router.get("/getall/aa:id", async (req, res) => {
  Product_Model.findById(req.params.id)
    .populate([
      {
        path: "SubCategory_ID",
        populate: {
          path: "HauptCategory_ID",
        },
      },
      { path: "Shop_ID" },
      { path: "Suggestions_ID" },
    ])

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark around all fishs " + err));
});

////----------------------------------------------------------------------------------------
router.post("/:id", upload.upload.single("ImagePath"), async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const Photos = { Photos: req.file?.path };

  const SubCategoryID = await SubCategory_Model.findOne({
    SubCategoryName: update.subCategoryName,
  }).select("_id");

  const Shopid = await Shop_Model.findOne({
    ShopName: update.shopName,
  }).select("_id");

  const SuggestID = await Suggestions_Model.findOne({
    SuggestionsName: update.suggestName,
  }).select("_id");

  const resultOfUpdate = {
    ...update,
    SubCategory_ID: SubCategoryID,
    Shop_ID: Shopid,
    Suggestions_ID: SuggestID,
  };

  Product_Model.findByIdAndUpdate(id, resultOfUpdate, function (err, user) {
    if (err) return res.send(err);
  });
  if (Photos)
    Product_Model.findByIdAndUpdate(id, Photos, function (err, user) {
      if (err) return res.send(err);
    });
  res.json({ Success: true });
});

////----------------------------------------------------------------------------------------
router.post("/deleteOneProduct", async (req, res) => {
  const { ProductNameID } = req.body;
  Product_Model.deleteOne({
    _id: ProductNameID,
  })

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark ate fish "));
});

////----------------------------------------------------------------------------------------
router.get("/getHauptcategory", async (req, res) => {
  HauptCategory_Model.find()

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark ate fish "));
});
////----------------------------------------------------------------------------------------

router.get("/getSubCategory/:hauputname", async (req, res) => {
  const { hauputname } = req.params;

  const id = await HauptCategory_Model.find({
    categoryNameBasic: hauputname,
  }).select("_id");

  SubCategory_Model.find({
    HauptCategory_ID: id,
  })

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark ate fish " + err));
});

module.exports = router;
