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
      validate(value) {
        var re = "^[6-9]d{9}$";
        if (!re.test(value)) {
          throw new Error("Phone Number is invalid");
        }
      },
    },
    pinCode: {
      type: Number,
      required: true,
      validate(value) {
        var re = "^[1-9][0-9]{5}$";
        if (!re.test(value)) {
          throw new Error("Phone Number is invalid");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;
