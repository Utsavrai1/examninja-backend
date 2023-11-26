const asyncHandler = require("express-async-handler");

const addQuestion = asyncHandler(async (req, res) => {
    const { exam_id , question , options , mark} = req.body;
    try {
        const question_id = uuidv4().toString();
        const query = `Insert into Questions (question_id , exam_id, question, options, mark) values('${question_id}','${exam_id}', '${question}','${options}','${mark}')`;
          client.query(query, function (err, result) {
            if (err) {
              console.error("error running query", err);
              res.status(500).json({
                error: "Internal Server Error",
              });
            } else {
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

module.exports = {addQuestion};