const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const getUser = require("../functions/getUser");
const Worker = require("../models/worker");

// Get /workers?limit=10&skip=10
router.get("/workers", auth, getUser, async (req, res) => {
  const pincode = req.query.pincode;
  const skip = req.query.skip;
  const limit = req.query.limit;
  try {
    const workers = await Worker.findAll({ pincode: pincode })
      .skip(skip)
      .limit(limit);

    res.status(202).send(workers);
  } catch (err) {
    res.status(404).send(err);
  }
});

// bulk adds workers using ml model
router.post("/workers/bulkAdd", auth, getUser, async (req, res) => {
  const workers = req.body.workers;
  try {
    workers.forEach(async worker => {
      var object = new Worker(worker);
      try {
        await object.save();
      } catch (err) {
        console.log(err);
        return;
      }
    });
    res.status(200).send(workers);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
