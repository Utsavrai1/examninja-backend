const { addQuestion, getQuestion } = require("../controller/question_controller");

const express = require("express");
const router = express.Router();

router.post("/addQuestion", addQuestion);

router.get("/getQuestion", getQuestion);


module.exports = router;
