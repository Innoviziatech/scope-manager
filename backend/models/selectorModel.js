const mongoose = require("mongoose");

const selectorSchema = new mongoose.Schema(
  {
    prefferedInput: {
      type: String,
      required: [true, "Input is required"],
    },
    prefferedOutput: {
      type: String,
      required: [true, "Output is required"],
    },
    selectorName: {
      type: String,
      required: [true, "Selector is required"],
    },

    subSection: {
      type: mongoose.Schema.ObjectId,
      ref: "SubSection",
    },
    section: {
      type: mongoose.Schema.ObjectId,
      ref: "Section",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Selector = mongoose.model("Selector", selectorSchema);

module.exports = Selector;
