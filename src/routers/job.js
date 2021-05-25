const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Job = require("../models/job");
