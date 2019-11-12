require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var Sequelize = require("sequelize");
var db = require("./models");
var bodyParser = require("body-parser");
var debug = require("debug");
var morgan = require("morgan");
var passport = require("passport");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var LocalStrategy = require("passport-local").Strategy;

// new express instance
var app = express();
var PORT = process.env.PORT || 3001;

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
// Middleware
app.use(morgan("tiny"));
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(express.static("public"));
app.use(require("morgan")("combined"));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(cookieParser());
app.use(
    session({
        secret: "library"
    })
);
app.use(
    require("express-session")({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false
    })
);

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
    force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
    app.listen(PORT, function () {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

module.exports = app;