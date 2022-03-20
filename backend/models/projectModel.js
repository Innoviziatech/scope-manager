const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, "Please provide project name"],
      unique: true,
    },
    description: {
      type: String,
    },
    clients: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Client",
      },
    ],
    staff: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Staff",
      },
    ],
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: "clients",
    select: "clientName",
  }).populate({
    path: "staff",
    select: "name",
  });
  next();
});

projectSchema.virtual("pages", {
  ref: "Page",
  foreignField: "project",
  localField: "_id",
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
