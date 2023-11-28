const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    optionSuccessStatus: 200,
    Headers: true,
    credentials: true,
    origin: true,
    exposedHeaders: "Set-Cookie",
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
    ],
  })
);

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`Welcome to Exam Ninja Backend`);
});

app.listen(PORT, () => {
  console.log(`Server rocking on ${PORT}`.cyan);
});

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use(morgan("dev"));

require('./database/connection');

const authRoutes = require("./routes/auth_routes");
const examRoutes = require("./routes/exam_routes");
const questionRoutes = require("./routes/question_routes");

app.use('/api/auth', authRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/question', questionRoutes);
