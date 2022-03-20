const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    pageName: {
      type: String,
      required: true,
    },
    pageSequence: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: false,
    },
    pageURL: {
      type: String,
      required: true,
    },
    screenShots: [String],
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
      required: [true, "Page must belong to a project"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

pageSchema.virtual("sections", {
  ref: "Section",
  foreignField: "page",
  localField: "_id",
});
const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
