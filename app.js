const express = require("express");
const morgan = require("morgan");
const path = require("path");
const htmlTemplate = require("html-template-tag");
const { db, Page, User } = require("./models");
const wikiRouter = require("./routes/wiki");
const usersRouter = require("./routes/users");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use("/wiki", wikiRouter);
app.use("/users", usersRouter);

app.use("/", (req, res, next) => {
  res.redirect("/wiki");
});

async function start() {
  try {
    await db.sync({ force: false });
  } catch (err) {
    console.log(err);
  }
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}
start();
