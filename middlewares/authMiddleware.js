const jwt = require('jsonwebtoken');

// Middleware to authenticate users via JWT
exports.authenticateUser = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'No token, authorization denied' });
  }

  // Check if the token is prefixed with 'Bearer ' and extract it if so
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Expecting the token payload to contain a 'user' object
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to authorize admin users only
exports.authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res
    .status(403)
    .json({ message: 'Access denied. Admin role required.' });
};
