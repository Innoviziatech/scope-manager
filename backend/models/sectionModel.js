const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    page: {
      type: mongoose.Schema.ObjectId,
      ref: "Page",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

sectionSchema.virtual("selectors", {
  ref: "Selector",
  foreignField: "section",
  localField: "_id",
});
sectionSchema.virtual("subSections", {
  ref: "SubSection",
  foreignField: "Subsection",
  localField: "_id",
});

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
