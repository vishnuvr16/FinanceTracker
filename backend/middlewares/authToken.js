const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    // const token = req.cookies?.token;

    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    console.log(headerObj);

    console.log("token", token);

    if (!token) {
      return res.status(200).json({
        message: "try login again",
        error: true,
        success: false,
      });
    }

    // ? verify token
    jwt.verify(token, "financelogin", function (err, decoded) {
      if (err) {
        console.log(err);
      }
      req.userId = decoded?.id;
      console.log("id", req.userId);
    });
    next();
  } catch (err) {
    console.log(err);
    res.json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
