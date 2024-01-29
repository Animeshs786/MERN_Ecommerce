process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit();
});

const mongoose = require("mongoose");

const app = require("./app");

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config({ path: "backend/config.env" });
}

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connection create successully");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection not created. Something went wrong.");
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Site run on the port:${port} `);
});

process.on("unhandledRejection", function (err) {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
