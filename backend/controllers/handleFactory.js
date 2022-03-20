const APIFeatures = require("../utils/APIFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

//! (((((((((((((((((((((   DELETE ONE DOCUMENT   )))))))))))))))))))))

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`No document found with id :${req.params.id}`, 404)
      );
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

//! (((((((((((((((((((((   UPDATE ONE DOCUMENT   )))))))))))))))))))))

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.body.password && req.body.passwordConfirm) {
      if (req.body.password !== req.body.passwordConfirm)
        return next(new AppError("Passwords are not matching", 400));
    }
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(
        new AppError(`No document found with id : ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      status: "success",
      doc,
    });
  });

//! (((((((((((((((((((((   CREATE ONE DOCUMENT   )))))))))))))))))))))

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: newDoc,
    });
  });
//! (((((((((((((((((((((   GET ONE DOCUMENTS  )))))))))))))))))))))
exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;

    if (!doc) {
      return next(
        new AppError(`No document found with id : ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      status: "success",
      doc,
    });
  });

//! (((((((((((((((((((((   GET ALL DOCUMENTS   )))))))))))))))))))))
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //!EXECUTE QUERY********************

    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // const docs = await features.query.explain();
    const docs = await features.query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      docs,
    });
  });
