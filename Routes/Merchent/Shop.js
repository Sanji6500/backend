const router = require("express").Router();
const fs = require("fs");

const [
  Shop_Model,
  ShopAndMerchent_Model,
  ShopCategory_Model,
] = require("../../Models/Merchent/Shop");
const errorResponse = require("../../Utils/errorResponse");
const upload = require("../../Middleware/Upload");
const MerchentModel = require("../../Models/Merchent/Merchent");

router.post("/AddShopCategory", async (req, res, next) => {
  const { ShopCategoryName } = req.body;

  const Result = await ShopCategory_Model.findOne({
    ShopCategoryName: ShopCategoryName,
  });

  if (!Result) {
    const AddShopCategory_Model = new ShopCategory_Model({
      ShopCategoryName: ShopCategoryName,
    });

    AddShopCategory_Model.save()
      .then(() => res.json({ Success: true }))
      .catch((err) =>
        res.status(500).json("Error code :Shark has fish " + err)
      );
  } else
    res
      .status(400)
      .json({ Message: "ShopCategory already exists", success: false });
});
////----------------------------------------------------------------------------------------
router.post(
  "/AddShop",
  upload.upload.single("Loge"),
  async (req, res, next) => {
    const {
      ShopName,
      ShopCategoryNameID,
      city,
      Street,
      HouseNumber,
      State,
      ZipCode,
      ShopTelefon,
      GoogleMapPoint,
    } = req.body;

    const Result = await Shop_Model.findOne({
      ShopName: ShopName,
      Street: Street,
      HouseNumber: HouseNumber,
      city: city,
    });
    if (!Result) {
      const AddShop = new Shop_Model({
        ShopCategory_ID: ShopCategoryNameID,
        ShopName: ShopName,
        city: city,
        Street: Street,
        HouseNumber: HouseNumber,
        ZipCode: ZipCode,
        ShopTelefon: ShopTelefon,
        GoogleMapPoint: GoogleMapPoint,
        State: State,
        Loge: req.file.path,
      });

      AddShop.save()
        .then(() => res.json({ success: true }))
        .catch((err) => {
          fs.unlink(req.file.path, function (err) {
            if (err) return console.log(err);
          });
          res.json("Error code :Shark has fisch ");
        });
    } else {
      fs.unlink(req.file.path, function (err) {
        if (err) return console.log(err);
      });

      return res
        .status(400)
        .json({ Message: "Shop already exists", success: false });
    }
  }
);

router.post("/ConnectingMerchantToStore", async (req, res) => {
  const { ShopName, email } = req.body;

  const MerchentID = await MerchentModel.findOne({ email: email }).select(
    "_id"
  );

  const ShopModelID = await Shop_Model.findOne({ ShopName: ShopName }).select(
    "_id"
  );

  const Result = await ShopAndMerchent_Model.findOne({
    Merchent_id: MerchentID,
    Shop_id: ShopModelID,
  });
  if (!Result) {
    const AddShopAndMerchent_Model = new ShopAndMerchent_Model({
      Shop_id: ShopModelID,
      Merchent_id: MerchentID,
    });

    AddShopAndMerchent_Model.save()
      .then(() => res.json({ Success: true }))
      .catch((err) => {
        res.status(500).json("Error code :Shark has fish ");
      });
  } else
    return res
      .status(400)
      .json({ Message: "This person is linked to this store", success: false });
});

////----------------------------------------------------------------------------------------
router.post("/getShopCategory", async (req, res) => {
  Shop_Model.find()

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark has fisch"));
});

////----------------------------------------------------------------------------------------

router.post("/getShopMerchent", async (req, res) => {
  const { Shop_id } = req.body;

  ShopAndMerchent_Model.find({ Shop_id: Shop_id.trim() })

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark has fisch"));
});

module.exports = router;
