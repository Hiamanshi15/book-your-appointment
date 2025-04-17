const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/dashboard", auth, (req, res) => {
  res.json({status: 200, msg: "Welcome to the protected dashboard!", user: req.user });
});

module.exports = router;
