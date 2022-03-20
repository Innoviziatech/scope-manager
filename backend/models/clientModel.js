const mongoose = require("mongoose");
const validator = require("validator");

const clientSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      unique: true,
      required: [true, "Please provide client name"],
    },
    nationality: {
      type: String,
      required: [true, "Please provide client's nationality"],
    },
    companyName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["Boss", "Employee", "3rd party"],
        message: "role can either be boss,employee or 3rd party",
      },
    },

    clientLevel: {
      type: String,
      default: "A",
    },
    mobile: {
      type: Number,
      required: [true, "Please select project name"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Please provide client's email address"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    projects: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

clientSchema.pre(/^find/, function (next) {
  this.populate({
    path: "projects",
    select: "projectName",
  });
  next();
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
