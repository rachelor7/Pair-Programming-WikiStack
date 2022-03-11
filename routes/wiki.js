const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const { addPage, wikiPage, main } = require("../views");
const { Page } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const allPages = await Page.findAll();
    res.send(main(allPages));
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  try {
    const page = await Page.create({
      title: title,
      content: content,
    });
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});
router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  // res.send(`hit dynamic route at ${req.params.slug}`);
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug },
    });
    res.send(wikiPage(page));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
