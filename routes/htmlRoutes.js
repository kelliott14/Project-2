var db = require("../models");
var jwt = require("jsonwebtoken");
var auth = require("../auth/auth");

module.exports = function(app) {
  // login
  app.get("/", function(req, res) {
    res.render("index", {
      user: req.user
    });
  });

  app.post("/api/login", function(req, res) {
    db.User.findOne({
      where: {
        user_name: req.body.userLogin
      }
    }).then(function(results) {
      console.log(results);
      if (results && req.body.userPassword == results.password) {
        var token = jwt.sign({ user: results.id }, "secret", {
          expiresIn: 10000000
        });
        res.cookie("token", token);
        console.log(token);
        res.redirect("/dashboard");
      } else {
        res.render("index", {
          message: "authentication error"
        });
      }
    });
  });

  // dashboard
  app.get("/dashboard", auth, function(req, res) {
    res.render("dashboard");
  });

  // game list
  app.get("/chooseGame", auth, function(req, res) {
    res.render("chooseGame");
  });

  // play game
  app.get("/playGame/:id", auth, function(req, res) {
    db.sequelize
      .query(
        "SELECT * FROM foxhunt_db.usertasks inner join tasks on usertasks.task_id = tasks.id inner join games on tasks.game_id = games.id inner join usergames on games.id = usergames.game_id where usergames.id = " +
          req.params.id
      )
      .then(function(result) {
        res.render("playGame", { games: result });
        console.log(result);
      });
  });

  // admin game list
  app.get("/adminGameList", auth, function(req, res) {
    res.render("adminGameList");
  });

  // admin edit
  app.get("/adminEdit", auth, function(req, res) {
    res.render("adminEdit");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
