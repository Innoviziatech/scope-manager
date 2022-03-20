const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});

dotenv.config({ path: `${__dirname}/config.env` });
const app = require("./app");

mongoose.connect(process.env.DATABASE_URI).then(() => {
  console.log("Database connected successfully 😀😀");
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port :${port}`);
});
process.on("unhandledRejection", (err) => {
  console.log("err", err);
  console.log("UnhandledRejection , shutting down 😶");
  server.close(() => {
    process.exit(1);
  });
});
