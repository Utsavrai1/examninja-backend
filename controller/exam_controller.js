const asyncHandler = require("express-async-handler");

const createExam = asyncHandler(async (req, res)=>{
    const {subject , marks , teacher_id, duration, title} = req.body;

    try {
        const exam_id = uuidv4().toString();
        const query = `Insert into Exam (exam_id , subject, marks, teacher_id, duration, title) values('${exam_id}','${subject}', '${marks}','${teacher_id}','${duration}', '${title}')`;
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
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
});

module.exports = {createExam};