const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    project: {
      type: String,
    },
    task: {
      type: String,
      required: [true, "Task description is required"],
    },
    dueDate: {
      type: String,
    },
    responsibility: {
      type: String,
    },
    minTime: String,
    maxTime: String,
    category: String,
    TT: String,
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

taskSchema.pre(/^find/, function (next) {
  this.populate({
    path: "project",
    select: "projectName",
  }).populate({
    path: "responsibility",
    select: "name",
  });

  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
