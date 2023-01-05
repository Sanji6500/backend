const router = require("express").Router();
const fs = require("fs");
const [deviceDetector_Model] = require("../../Models//Tracker/deviceTracker");

const mongoose = require("mongoose");

router.post("/AddHauptCategory", async (req, res) => {
  const { Customer_ID, Device, os, AppOrBrowser, UserUniqId } = req.body;
  const Result = await deviceDetector_Model.findOne({
    UserUniqId: UserUniqId,
  });

  if (!Result) {
    const AdddeviceDetector_Model = new deviceDetector_Model({
      Customer_ID: Customer_ID,
      Device: Device,
      os: os,
      AppOrBrowser: AppOrBrowser,
      UserUniqId: UserUniqId,
    });
    AdddeviceDetector_Model.save()
      .then(() => res.json({ Success: true }))
      .catch((err) => res.status(500).json("Error code : Solman  "));
  } else
    return res
      .status(400)
      .json({ Message: " UserUniqId already exists", success: false });
});
////----------------------------------------------------------------------------------------
