const jwt = require("jsonwebtoken");

const generateUserAccessToken = (userId, userType) => {
  try {
    const token = jwt.sign(
      { _id: userId.toString(), userType: userType },
      process.env.SECRET_KEY,
      {
        expiresIn: "1y",
      }
    );
    return token;
  } catch (error) {
    return null;
  }
};

module.exports = { generateUserAccessToken };
