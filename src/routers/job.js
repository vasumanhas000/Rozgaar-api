const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const getUser = require("../functions/getUser");
const Job = require("../models/job");

router.post("/jobs", auth, getUser, async (req, res) => {
  const job = new Job({
    ...req.body,
    createdBy: req.user._id,
  });
  try {
    job.save();
    res.status(200).send(job);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/jobs", auth, getUser, async (req, res) => {
  try {
    await req.user
      .populate({
        path: "jobs",
      })
      .execPopulate();
    res.status(201).send(req.user.jobs);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
