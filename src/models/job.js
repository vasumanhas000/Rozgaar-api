const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
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
    validate(value) {
      var re = "^[1-9][0-9]{5}$";
      if (!re.test(value)) {
        throw new Error("Phone Number is invalid");
      }
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  applicants: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
