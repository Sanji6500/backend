const router = require("express").Router();

const [Suggestion_Model] = require("../../Models/Tracker/Suggestions");

router.post("/AddSuggest", async (req, res) => {
  const { SuggestionsName } = req.body;
  const Result = await Suggestion_Model.findOne({
    SuggestionsName: SuggestionsName,
  });

  if (!Result) {
    const AddSuggestion_Model = new Suggestion_Model({
      SuggestionsName: SuggestionsName,
    });
    AddSuggestion_Model.save()
      .then(() => res.json({ Success: true }))
      .catch((err) => res.status(500).json("Error code :BabyShark"));
  } else
    return res
      .status(400)
      .json({ Message: "SuggestionsName already exists", success: false });
});

router.get("/getSuggest", async (req, res) => {
  Suggestion_Model.find()

    .then((result) => res.json({ Success: true, result }))
    .catch((err) => res.json("Error code :Shark ate fish "));
});

module.exports = router;
////----------------------------------------------------------------------------------------
