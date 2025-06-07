const jwt = require('jsonwebtoken');

const generateAccessToken = (email) => {
  return jwt.sign({ email }, TOKEN_SECRET, { expiresIn: "1800s" }); // 1800s = 30mins
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      success: false,
      message: "Access Denied. No token provided.",
    });
  }

  try {
    const validToken = jwt.verify(token, TOKEN_SECRET);

    if (validToken) {
      req.user = validToken;

      next();
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};