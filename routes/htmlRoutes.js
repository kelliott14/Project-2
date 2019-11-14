var db = require("../models");
var jwt = require("jsonwebtoken");
var auth = require("../auth/auth");
var userLoggedIn = require("../auth/userLoggedIn");

module.exports = function (app) {
    // front page
    app.get("/", function (req, res) {
        res.render("index", {
            user: req.user
        });
    });

    app.post("/api/login", function (req, res) {
        console.log("LOGIN");
        db.User.findOne({
            where: {
                user_name: req.body.userLogin
            }
        }).then(function (results) {
            // console.log(results);
            if (results && req.body.userPassword == results.password) {
                var token = jwt.sign({ user: results.id }, "secret", {
                    expiresIn: 10000000
                });
                res.cookie("token", token);
                userLoggedIn.setId(results.id);
                // console.log(results.id);
                res.cookie("userId", results.id);
                res.render("dashboard");
            } else {
                console.log("error logging in");
                res.render("index", {
                    message: "authentication error"
                });
            }
        });
    });

    app.post("/api/register", function (req, res) {
        db.User.create({
            user_name: req.body.createName,
            password: req.body.createPassword
        }).then(function (dbPost) {
            res.render("index", { userCreated: true });
        });
    });

    // dashboard
    app.get("/dashboard", auth, function (req, res) {
        // console.log(userLoggedIn.getId());

        db.UserGame.findAll({
            where: {
                // user_id: userLoggedIn.getId(),
                game_finished: false
            },
            include: [{ model: db.Game }]
        })
            .then(function (results) {
                console.log(results);

            })

        // res.render("dashboard");
    });

    // game list
    app.get("/chooseGame", auth, function (req, res) {
        // console.log(userLoggedIn.getId());
        res.render("chooseGame");
    });

    // play game
    app.get("/playGame", auth, function (req, res) {
        // console.log(userLoggedIn.getId());
        res.render("playGame");
    });

    // admin game list
    app.get("/adminGameList", auth, function (req, res) {
        // console.log(userLoggedIn.getId());
        res.render("adminGameList");
    });

    // admin edit
    app.get("/adminEdit", auth, function (req, res) {
        // console.log(userLoggedIn.getId());
        res.render("adminEdit");
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        // console.log(userLoggedIn.getId());
        res.render("404");
    });
};