const {createExam} = require("../controller/exam_controller");

const express = require("express");
const router = express.Router();

router.post('/createExam', createExam);

module.exports = router;