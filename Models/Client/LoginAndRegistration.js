const router = require("express").Router();
const errorResponse = require("../../Utils/errorResponse");
const CustomerModel = require("../../Models/Client/Customer");

router.post("/register", async (req, res) => {
  const {
    username,
    email,
    password,
    telefonNumber,
    Street,
    HauseNummber,
    City,
    State,
    ZipCode,
    ShopTelefon,
    GoogleMapPoint,
    UserUniqId,
  } = req.body;

  const Result = await MerchentModel.findOne({ email: email });

  if (!Result) {
    const AddCustomer = new CustomerModel({
      username: username,
      email: email,
      password: password,
      telefonNumber: telefonNumber,
      City: City,
      Street: Street,
      HauseNummber: HauseNummber,
      State: State,
      ZipCode: ZipCode,
      ShopTelefon: ShopTelefon,
      GoogleMapPoint: GoogleMapPoint,
      UserUniqId: UserUniqId,
    });
    AddCustomer.save()
      .then(() => sendtoken(AddCustomer, res))
      .catch((err) => res.status(500).json("Error Code Fisch"));
  } else return res.status(401).json("Email already exists");
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  CustomerModel.findOne({ email: email })
    .select("+password")
    .then((Result) => {
      if (!Result) return res.status(404).json("Email is not exists");

      isMatch = CustomerModel.matchPasswords(password);
      if (!isMatch) return res.status(404).json("Password is Wrong");

      sendtoken(MerchentModel, res);
    })
    .catch((err) => res.status(500).json("Error Code Fish"));
});
const sendtoken = (Model, res) => {
  const token = Model.getSigndtToken();
  res.json({ Succes: true, token });
};
module.exports = router;
