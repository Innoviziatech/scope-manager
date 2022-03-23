// const cloudinary = require("cloudinary");
const multer = require("multer");
const cloudinary = require("cloudinary");
const Page = require("../models/pageModel");
const AppError = require("../utils/appError");
// const AppError = require("../utils/appError");
// const catchAsync = require("../utils/catchAsync");
const factory = require("./handleFactory");

exports.setProjectId = (req, res, next) => {
  //! allow nested routes
  if (!req.body.project) req.body.project = req.params.projectId;

  next();
};

// const multerStorage = multer.diskStorage({});

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Not an image .Please upload only images 🙂", 400), false);
//   }
// };
// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// exports.uploadScreenShots = upload.fields([
//   {
//     name: "screenShots",
//     maxCount: 15,
//   },
// ]);

exports.uploadScreenShotsOnCloudinary = async (req, res, next) => {
  let images = [];

  if (typeof req.body.screenShots === "string") {
    images.push(req.body.screenShots);
  } else {
    images = req.body.screenShots;
  }
  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "screenShots",
      crop: "scale",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.screenShots = imagesLinks;
  console.log(imagesLinks);

  next();
};

exports.getAllPages = factory.getAll(Page);
exports.getPage = factory.getOne(Page, {
  path: "sections",
  select: "-__v",
});
exports.createPage = factory.createOne(Page);
exports.updatePage = factory.updateOne(Page);
exports.deletePage = factory.deleteOne(Page);
