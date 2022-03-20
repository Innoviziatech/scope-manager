// const cloudinary = require("cloudinary");
// const multer = require("multer");
const Page = require("../models/pageModel");
// const AppError = require("../utils/appError");
// const catchAsync = require("../utils/catchAsync");
const factory = require("./handleFactory");

exports.setProjectId = (req, res, next) => {
  //! allow nested routes
  if (!req.body.project) req.body.project = req.params.projectId;

  next();
};

// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${new Date().toISOString()}-${file.originalname}`);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Not an image. Please upload only images", 400), false);
//   }
// };
// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: 1024 * 2048,
// });

// exports.uploads = (file, folder) =>
//   new Promise((resolve) => {
//     cloudinary.uploader.upload(
//       file,
//       (result) => {
//         resolve({
//           url: result.url,
//           id: result.public_id,
//         });
//       },
//       {
//         resource_type: "auto",
//         folder: folder,
//       }
//     );
//   });
// exports.uploadScreenShotInCloud = catchAsync(async (req, res, next) => {
//   const uploader = async (path) =>
//     await cloudinary.uploads(path, "screenShots");

//   if (req.method === "POST") {
//     const urls = [];
//     const { files } = req;
//     for (const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path);
//       urls.push(newPath);
//       fs.unlinkSync(path);
//     }
//     next();
//   }
// });

exports.getAllPages = factory.getAll(Page);
exports.getPage = factory.getOne(Page, {
  path: "sections",
  select: "-__v",
});
exports.createPage = factory.createOne(Page);
exports.updatePage = factory.updateOne(Page);
exports.deletePage = factory.deleteOne(Page);
