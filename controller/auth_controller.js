const asyncHandler = require("express-async-handler");
const { generateUserAccessToken } = require("../function/generate_token");
const { v4: uuidv4 } = require("uuid");
const client = require("../database/connection");
const colors = require("colors");
const bcrypt = require("bcrypt");

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, user_type } = req.body;

  try {
    const user_id = uuidv4().toString();
    const token = generateUserAccessToken(user_id, user_type);

    const hashPassword = bcrypt.hashSync(password, 10).toString();

    const query = `Insert into Users values('${user_id}','${email}', '${hashPassword}','${name}','${user_type}')`;
    console.log(query.blue);
    client.query(
      query,
      function (err, result) {
        if (err) {
          return console.error("error running query", err);
        }
        console.log(result.rows);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = { signUp };
