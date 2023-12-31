-- This Command Create Users Table

Create Table Users(
  user_id Varchar(100) PRIMARY KEY,
  email Varchar(1000) Not Null,
  password Varchar(1000) Not Null,
  name Varchar(1000) Not Null,
  user_type Varchar(1000) Not Null,
  class Varchar(1000) DEFAULT Null,
  date_registered DATE NOT NULL DEFAULT CURRENT_DATE
);

--This Command Create Exam Table

Create Table Exams(
  exam_id Varchar(100) PRIMARY KEY,
  subject Varchar(100) Not Null,
  marks INT NOT NULL,
  teacher_id Varchar(100) REFERENCES Users(user_id) NOT NULL,
  duration INT NOT NULL,
  title TEXT,
  end_date Varchar(100) NOT NULL,  
  for_class Varchar(1000) DEFAULT Null,
  date_created DATE NOT NULL DEFAULT CURRENT_DATE,
  is_live BOOLEAN DEFAULT false
);

--This Command Create Question Table

CREATE TABLE Questions (
    question_id VARCHAR(100) PRIMARY KEY,
    exam_id VARCHAR(100) REFERENCES Exams(exam_id) NOT NULL,
    question_text VARCHAR(255) NOT NULL
);

--This Command Create Options Table

CREATE TABLE Options (
    option_id VARCHAR(100) PRIMARY KEY,
    question_id VARCHAR(100) REFERENCES Questions(question_id) NOT NULL,
    option_text VARCHAR(100) NOT NULL,
    is_correct BOOLEAN NOT NULL
);

--This Command Create Answers Table

Create TABLE Answers (
  answer_id VARCHAR(100) PRIMARY KEY,
  option_id Varchar(100) REFERENCES Options(option_id) Not NULL,
  question_id VARCHAR(100) REFERENCES Questions(question_id) NOT NULL,
  exam_id VARCHAR(100) REFERENCES Exams(exam_id) NOT NULL,
  user_id Varchar(100) REFERENCES Users(user_id) NOT NULL,
  answer_text Varchar(100) Not Null
);

--This Command Create Result Table

Create TABLE Results (
  result_id VARCHAR(100) PRIMARY KEY,
  exam_id VARCHAR(100) REFERENCES Exams(exam_id) NOT NULL,
  user_id Varchar(100) REFERENCES Users(user_id) NOT NULL,
  score Varchar(100) NOT Null
)
