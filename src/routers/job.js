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
    res.status(400).send(err);
  }
});

router.patch("/jobs/apply/:id", auth, getUser, async (req, res) => {
  if (req.user.isOrganization === true) {
    const _id = req.params.id;

    try {
      const job = await Job.findOne({ _id, createdBy: req.user._id });
      console.log(job);
      const applicant = req.body;
      job.applicants.push(applicant);
      job.save();
      res.status(202).send("Applicant posted successfully");
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(400).send("You're not an organization");
  }
});
router.get("/jobs/getApplicants/:id", auth, getUser, async (req, res) => {
  const _id = req.params.id;
  try {
    const job = await Job.findOne({ _id, createdBy: req.user._id });
    if (!job) {
      throw new Error("Job not found");
    }
    res.status(200).send(job.applicants);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
