const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const client = require("../database/connection");

const addQuestion = asyncHandler(async (req, res) => {
  const { exam_id, question, options , correctOption} = req.body;
  try {
    const question_id = uuidv4().toString();
    const query = `Insert into Questions values('${question_id}','${exam_id}', '${question}')`;
    client.query(query, function (err, result) {
      if (err) {
        console.error("error running query", err);
        res.status(500).json({
          error: "Internal Server Error",
        });
      } else {
        const options_list = options.split(",");

        for (var i = 0; i < 4; i++) {
          const option_id = uuidv4().toString();
          if(options_list[i] === correctOption){
            const query = `Insert into Options values('${option_id}','${question_id}', '${options_list[i]}', true)`;
            client.query(query, function (err, result) {
              if (err) {
                console.error("error running query", err);
                res.status(500).json({
                  error: "Internal Server Error",
                });
              }
            });

          }else{
            const query = `Insert into Options values('${option_id}','${question_id}', '${options_list[i]}', false)`;
            client.query(query, function (err, result) {
              if (err) {
                console.error("error running query", err);
                res.status(500).json({
                  error: "Internal Server Error",
                });
              }
            });

          }
        }
        return res.status(200).json({
          message: "Question added successfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});


const getQuestion = asyncHandler(async (req, res)=>{
  const {exam_id} = req.query;

  try {
    const query = `Select * from questions q, options o where q.exam_id = '${exam_id}' AND q.question_id = o.question_id`;
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
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = { addQuestion , getQuestion};
