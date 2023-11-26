const asyncHandler = require("express-async-handler");
const { generateUserAccessToken } = require("../function/generate_token");
const { v4: uuidv4 } = require("uuid");
const client = require("../database/connection");
const colors = require("colors");
const bcrypt = require("bcrypt");

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, user_type,studentclass } = req.body;

  try {
    const user_id = uuidv4().toString();
    const token = generateUserAccessToken(user_id, user_type);

    const hashPassword = bcrypt.hashSync(password, 10).toString();

    const userExistQuery = `Select * from Users where email = '${email}'`;

    client.query(userExistQuery, function (err, result) {
      if (err) {
        console.error("error running query", err);
        res.status(500).json({
          error: "Internal Server Error",
        });
      } else {
        if (result.rows.length == 0) {
          if (user_type === "Student") {
            const query = `Insert into Users values('${user_id}','${email}', '${hashPassword}','${name}','${user_type}', '${studentclass}')`;
            client.query(query, function (err, result) {
              if (err) {
                console.error("error running query", err);
                res.status(500).json({
                  error: "Internal Server Error",
                });
              } else {
                return res.status(200).json({
                  token: token,
                  user_id: user_id,
                  user_type: user_type,
                  message: "User registered successfully",
                });
              }
            });
          } else {
            const query = `Insert into Users values('${user_id}','${email}', '${hashPassword}','${name}','${user_type}')`;
            client.query(query, function (err, result) {
              if (err) {
                console.error("error running query", err);
                res.status(500).json({
                  error: "Internal Server Error",
                });
              } else {
                return res.status(200).json({
                  token: token,
                  user_id: user_id,
                  user_type: user_type,
                  message: "User registered successfully",
                });
              }
            });
          }
        } else {
          return res.status(402).json({
            error: "User already exists",
          });
        }
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const fetchAddedUserQuery = `Select * from Users where email = '${email}'`;
    client.query(fetchAddedUserQuery, async function (err, result) {
      if (err) {
        console.error("error running query", err);
        res.status(500).json({
          error: "Internal Server Error",
        });
      } else {
        if (result.rows.length == 0) {
          res.status(404).json({
            error: "User Dosen't Exists",
          });
        } else {
          const token = generateUserAccessToken(
            result.rows[0].user_id,
            result.rows[0].user_type
          );

          const match = await bcrypt.compare(password, result.rows[0].password);
          if (match) {
            res.status(200).json({
              token: token,
              user_id: result.rows[0].user_id,
              user_type: result.rows[0].user_type,
              message: "User Logined successfully",
            });
          } else {
            res.status(402).json({
              error: "Invalid Password",
            });
          }
        }
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = { signUp, logIn };
