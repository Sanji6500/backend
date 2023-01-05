const router = require("express").Router();
const errorResponse = require("../../Utils/errorResponse");
const MerchentModel = require("../../Models/Merchent/Merchent");

router.post("/register", async (req, res) => {
  const { username, email, password, telefonNumber } = req.body;

  const Result = await MerchentModel.findOne({ email: email });

  if (!Result) {
    const AddMerchent = new MerchentModel({
      username: username,
      email: email,
      password: password,
      telefonNumber: telefonNumber,
    });
    AddMerchent.save()
      .then(() => sendtoken(AddMerchent, res))
      .catch((err) => res.status(500).json("Error Code Shark"));
  } else return res.status(400).json("Email already exists");
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  MerchentModel.findOne({ email: email })
    .select("+password")
    .then((Result) => {
      if (!Result) return res.status(404).json("Email is not exists");

      isMatch = MerchentModel.matchPasswords(password);
      if (!isMatch) return res.status(404).json("Password is Wrong");

      sendtoken(MerchentModel, res);
    })
    .catch((err) => res.status(500).json("Error Code Shark"));
});
const sendtoken = (Model, res) => {
  const token = Model.getSigndtToken();
  res.json({ Succes: true, token });
};
module.exports = router;
