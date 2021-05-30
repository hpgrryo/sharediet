const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Weight = require("../models/Weight");

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const weights = await Weight.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      weights,
    });
  } catch (error) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
