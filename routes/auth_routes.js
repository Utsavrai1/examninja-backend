const { signUp } = require("../controller/auth_controller");
const express = require("express");
const router = express.Router();

router.post("/signup", signUp);

module.exports = router;