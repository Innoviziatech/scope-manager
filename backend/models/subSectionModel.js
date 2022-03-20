const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema(
  {
    subSectionName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
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

subSectionSchema.virtual("selectors", {
  ref: "Selector",
  foreignField: "subSection",
  localField: "_id",
});

const SubSection = mongoose.model("SubSection", subSectionSchema);

module.exports = SubSection;
