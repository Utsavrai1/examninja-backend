const {createExam, getExamByTeacherId, publishExam, getExamByClass, addAnswer} = require("../controller/exam_controller");

const express = require("express");
const router = express.Router();

router.post('/createExam', createExam);

router.get('/getExamByTeacherId', getExamByTeacherId);

router.get("/publishExam", publishExam);

router.get("/getExamByClass", getExamByClass);

router.post("/addAnswer", addAnswer);

module.exports = router;