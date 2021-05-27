const mongoose = require("mongoose");
const Job = require("./job");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
  },
  isOrganization: {
    type: Boolean,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
});

userSchema.virtual("jobs", {
  ref: "Job",
  localField: "_id",
  foreignField: "createdBy",
});

const User = mongoose.model("User", userSchema);

// Deletes user jobs when user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await Job.deleteMany({
    createdBy: user._id,
  });
  next();
});

module.exports = User;
