const express = require("express");
const path = require("path");
const userRouter = require("./router/userRouter");
const jobRouter = require("./router/jobRouter");
const eventRouter = require("./router/eventRouter");
const profileRouter = require("./router/profileRouter");
const uploadImage = require("./router/uploadRouter");
const applyDetail = require("./router/applyDetailRouter");
const Common = require("./router/commonRouter");
const dotenv = require("dotenv");

dotenv.config();
const cors = require("cors");

require("./db/db");

const app = express();
const port = process.env.PORT;
console.log(path.join(__dirname, "../frontend"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(Common);
app.use(jobRouter);
app.use(eventRouter);
app.use(profileRouter);
app.use(uploadImage);
app.use(applyDetail);

// const lik = path.join(__dirname, "../frontend");
// const dsada = path.resolve(lik, "build", "index.html");
// // app.use(express.static("build"));
// console.log(dsada);

if (process.env.NODE_ENV === "production") {
  console.log("here");
  const lik = path.join(__dirname, "../frontend/build");
  //const dsada = path.resolve(lik, "build", "index.html");
  app.use(express.static(lik));
  app.get("*", (req, res) => res.sendFile(path.resolve(lik, "index.html")));
} else {
  app.get("/", (req, res) => res.send("Hello !!!"));
}

app.listen(port, () => {
  console.log("server is up on Port " + port);
});
