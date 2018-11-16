var express = require("express");
var app = express();
var morgan = require("morgan");
var passport = require("passport");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const routes = require("./routeHandler/routes");
var { mongoose } = require("./configDB/db");

//require("./configDB/passport")(passport);

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(passport.initialize());
app.use(passport.session());

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use("/recruiter", routes.Recruiter);
app.use("/applicant", routes.User); // by shivam 14/11
app.use("/applicant/search", routes.Search); //  by shivam 14/11
app.use("/applicant/connections", routes.ApplicantConnections);
app.use("/saveJob", routes.SaveJob);
// app.use("/dashboard", routes.Dashboard);
//app.use("/applicant/messages", routes.ApplicantMessages); // by shivam 15/11
app.use("/applicant/profile", routes.ApplicantProfile); // changed for applicant by shivam 14/11
app.listen(3001);
console.log("Server Listening on port 3001");
