const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

// middleware
app.use(bodyParser.json());
//middleware
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// middleware
app.use(passport.initialize());
//middleware
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets from react server side
  // check here first
  app.use(express.static("client/build"));

  // Express will server up index.html if does not understand route
  // check here next
  const path = require("path");
  app.get(
    "*",
    (req,
    res => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
