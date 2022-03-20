const mongoose = require("mongoose");
const validator = require("validator");

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "name is required"],
    },
    position: {
      type: String,
      required: [true, "position is required"],
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["Super Admin", "Developer", "Manager"],
        message: "role can either be Super Admin or Developer",
      },
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Please provide client's email address"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
