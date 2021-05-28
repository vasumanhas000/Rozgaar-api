const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    jobType: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;
