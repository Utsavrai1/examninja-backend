const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const client = require("../database/connection");

const createExam = asyncHandler(async (req, res) => {
  const {
    subject,
    marks,
    teacher_id,
    duration,
    title,
    end_date,
    classOfStudent,
  } = req.body;

  try {
    const exam_id = uuidv4().toString();
    const query = `Insert into Exams values('${exam_id}','${subject}', '${marks}','${teacher_id}','${duration}', '${title}', '${end_date}','${classOfStudent}')`;
    client.query(query, function (err, result) {
      if (err) {
        console.error("error running query", err);
        res.status(500).json({
          error: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          message: "Exam created successfully",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

const getExamByTeacherId = asyncHandler(async (req, res) => {
  const { teacher_id } = req.query;

  try {
    const query = `Select * from exams e, Users u where e.teacher_id = '${teacher_id}' AND e.teacher_id = u.user_id`;
    client.query(query, function (err, result) {
      if (err) {
        console.error("error running query", err);
        res.status(500).json({
          error: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          message: "Exam fetched successfully",
          data: result.rows,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

const publishExam = asyncHandler(async (req, res) => {
  const { exam_id } = req.query;

  try {
    const query = `Update exams set is_live = true where exam_id = '${exam_id}'`;
    client.query(query, function (err, result) {
      if (err) {
        console.error("error running query", err);
        res.status(500).json({
          error: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          message: "Exam is now live",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

const getExamByClass = asyncHandler(async (req, res) => {
  const { student_class } = req.query;
  try {
    const query = `Select * from exams e, users u where e.is_live = true and e.for_class = '${student_class}' and e.teacher_id = u.user_id`;
    client.query(query, function (err, result) {
      if (err) {
        console.error("error running query", err);
        res.status(500).json({
          error: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          message: "Exam fetched successfully",
          data: result.rows,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

const addAnswer = asyncHandler(async (req, res) => {
  const { answers, optionId, questionId, examId, user_id, score } = req.body;
  const answers_list = answers.split(",");
  const option_list = optionId.split(",");
  const question_list = questionId.split(",");

  console.log(answers_list);
  console.log(option_list);
  try {
    for (var i = 0; i < answers_list.length; i++) {
      const answer_id = uuidv4().toString();
      const query = `Insert into Answers values('${answer_id}','${option_list[i]}', '${question_list[i]}', '${examId}', '${user_id}', '${answers_list[i]}')`;
      client.query(query, function (err, result) {
        if (err) {
          console.error("error running query", err);
          res.status(500).json({
            error: "Internal Server Error",
          });
        } else {
        }
      });
    }

    const result_id = uuidv4().toString();
    const query = `Insert into Results values('${result_id}','${examId}','${user_id}', '${score}')`;
    client.query(query, function (err, result) {
      if (err) {
        console.error("error running query", err);
        res.status(500).json({
          error: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          message: "Answer Submitted successfully",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = {
  createExam,
  getExamByTeacherId,
  publishExam,
  getExamByClass,
  addAnswer,
};
