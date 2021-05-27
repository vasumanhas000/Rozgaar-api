const express = require("express");
const router = new express.Router();
const Worker = require("../models/worker");

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

module.exports = router;
