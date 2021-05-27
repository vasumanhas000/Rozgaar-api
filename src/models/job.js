const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobType: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    applicants: [
      {
        name: String,
        phone: Number,
        jobType: String,
        pinCode: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
