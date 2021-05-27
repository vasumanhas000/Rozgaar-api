const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const getUser = require("../functions/getUser");
const User = require("../models/user");

router.post("/users", auth, async (req, res) => {
  try {
    const user = new User({
      ...req.body,
      uid: req.userId,
    });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/users/myProfile", auth, getUser, async (req, res) => {
  res.status(200).send(req.user);
});

router.delete("/users", auth, getUser, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
