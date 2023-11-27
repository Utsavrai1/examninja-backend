const {createExam, getExamByTeacherId} = require("../controller/exam_controller");

const express = require("express");
const router = express.Router();

router.post('/createExam', createExam);

router.post('/getExamByTeacherId', getExamByTeacherId);

module.exports = router;