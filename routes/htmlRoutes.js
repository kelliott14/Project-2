var db = require("../models");
var jwt = require('jsonwebtoken');
var auth = require('../auth/auth');

module.exports = function (app) {
  // login
  app.get("/", function (req, res) {
    res.render("index", {
      user: req.user
    });
  });

  app.post("/api/login", function (req, res) {
    db.User.findOne({
      where: {
        user_name: req.body.userLogin
      }
    }).then(function (results) {
      console.log(results);
      if (results && req.body.userPassword == results.password) {
        var token = jwt.sign({ user: results.id }, 'secret', { expiresIn: 10000000 });
        res.cookie('token', token);
        res.redirect('/dashboard');
      } else {
        res.render('index', {
          message: 'authentication error'
        })
      }
    })
  });

  // dashboard
  app.get("/dashboard", auth, function (req, res) {
    res.render("dashboard");
  });

  // game list
  app.get("/chooseGame", auth, function (req, res) {
    // db.Game.findAll({}).then(function (dbGames) {
    //   res.render("chooseGame", {games: dbGames});
      res.render("chooseGame");
    // });
  });

  // play game
  app.get("/playGame", auth, function (req, res) {
    res.render("playGame");
  });

  // admin game list
  app.get("/adminGameList", auth, function (req, res) {
    res.render("adminGameList");
  });

  // admin edit
  app.get("/adminEdit", auth, function (req, res) {
    res.render("adminEdit");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
