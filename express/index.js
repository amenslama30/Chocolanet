const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');

const authRoute = require("./routes/authRoute.js");
const managementRoute = require("./routes/managementRoute.js");
const FacebookRoute = require("./routes/FacebookRoute.js");
const TwitterRoute = require("./routes/TwitterRoute.js");

const app = express();


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cookieParser()); // Use cookie-parser middleware
app.use(cors({
  origin: 'https://localhost:8082', // Replace with your frontend URL
  credentials: true // Allow credentials
}));

// Use express-session middleware for sessions
app.use(session({
  secret: 'Orixo2002.Amen12345!',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, httpOnly: true, sameSite: 'strict' }
}));


// Include auth routes

app.use(authRoute);
app.use(managementRoute);
app.use(FacebookRoute);
app.use(TwitterRoute);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const options = {
  key: fs.readFileSync('./cert.key'),
  cert: fs.readFileSync('./cert.crt')
};

const port = process.env.PORT || 8081;
const server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
