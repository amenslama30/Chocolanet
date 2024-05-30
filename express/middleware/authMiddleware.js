const jwt = require('jsonwebtoken')
const User = require("../models/User")

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
  
    if (token) {
      jwt.verify(token, 'secret key amen', async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.locals.user = null;
          next();
        } else {
          try {
            let user = await User.findById(decodedToken.id);
            req.user = user; // Add user to the request object
            res.locals.user = user; // Optionally, add user to response locals
            next();
          } catch (dbError) {
            console.error('Error fetching user from database:', dbError);
            res.status(500).json({ message: 'Internal server error' });
          }
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

module.exports= {
    checkUser
}