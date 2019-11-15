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
        console.log(userLoggedIn.getId());

        db.UserGame.findAll({
            attributes: ['GameId'],
            where: {
                UserId: userLoggedIn.getId()
            },
        })
            .then(function (results) {
                var gameIdArray = [];
                results.forEach(element => {
                    gameIdArray.push(element.GameId)
                });
                db.Game.findAll({ where: { id: gameIdArray } }).then(function (results) {
                    console.log(JSON.stringify(results));
                    res.render('dashboard', { userGames: results });
                })
            })
    });

    // game list
    app.get("/chooseGame", auth, function (req, res) {
        // console.log(userLoggedIn.getId());
        res.render("chooseGame");
    });

    // play game
    app.get("/playGame/:id", auth, function(req, res) {
    db.sequelize
      .query(
        "SELECT * FROM ayn9b8lihw1z06tx.UserTasks inner join Tasks on UserTasks.TaskId = Tasks.id inner join games on Tasks.game_id = Games.id inner join UserGames on Games.id = UserGames.GameId where UserGames.id = " +
          req.params.id
      )
      .then(function(result) {
        console.log(result);
        res.render("playGame", { games: result });
        console.log(games)
      });
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
