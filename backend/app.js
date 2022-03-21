const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const compression = require("compression");
const helmet = require("helmet");
const hpp = require("hpp");
// const cloudinary = require("cloudinary");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cookieparser = require("cookie-parser");

const AppError = require("./utils/appError");
const GlobalErrorHandler = require("./controllers/errorController");
const clientRouter = require("./routes/clientRoutes");
const projectRouter = require("./routes/projectRoutes");
const pageRouter = require("./routes/pageRoutes");
const staffRouter = require("./routes/staffRoutes");
const sectionRouter = require("./routes/sectionRoutes");
const subSectionRouter = require("./routes/subSectionRoutes");
const SelectorRouter = require("./routes/selectorRoutes");
const taskRouter = require("./routes/taskRoutes");

const app = express();

app.enable("trust proxy");

//! MIDDLEWARES ****************************
app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// limit request from same api
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP , please try again in an hour",
});

app.use("/sm/api", limiter);

// body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieparser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent HTTP parameter pollution ,removes duplicate fields in query
app.use(
  hpp({
    whitelist: [
      "ratingsAverage",
      "maxGuests",
      "standard",
      "rent",
      "roomFor",
      "ratingsQuantity",
    ],
  })
);

app.use("/sm/api/clients", clientRouter);
app.use("/sm/api/projects", projectRouter);
app.use("/sm/api/pages", pageRouter);
app.use("/sm/api/staff", staffRouter);
app.use("/sm/api/tasks", taskRouter);
app.use("/sm/api/sections", sectionRouter);
app.use("/sm/api/sub-sections", subSectionRouter);
app.use("/sm/api/selectors", SelectorRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"), (err) => {
      if (err) {
        res.status(500).send(__dirname);
      }
    });
  });
}
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(GlobalErrorHandler);
module.exports = app;
