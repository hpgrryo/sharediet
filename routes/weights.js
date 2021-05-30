const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Weight = require("../models/Weight");

// @desc    Show add page
// @route   GET /weights/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("weights/add");
});

// @desc    体重送信処理
// @route   POST /weights/add
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Weight.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
