-- This Commands Create Users Table

Create Table Users(
  user_id Varchar(100) PRIMARY KEY,
  email Varchar(1000) Not Null,
  password Varchar(1000) Not Null,
  name Varchar(1000) Not Null,
  user_type Varchar(1000) Not Null,
  date_registered DATE NOT NULL DEFAULT CURRENT_DATE
);