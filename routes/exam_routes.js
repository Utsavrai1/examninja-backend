const {createExam, getExamByTeacherId, publishExam} = require("../controller/exam_controller");

const express = require("express");
const router = express.Router();

router.post('/createExam', createExam);

router.get('/getExamByTeacherId', getExamByTeacherId);

router.get("/publishExam", publishExam);

module.exports = router;