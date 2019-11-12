var db = require("../models");

module.exports = function (app) {
  // login
  app.get("/", function (req, res) {
    res.render("index");
  });

  // dashboard
  app.get("/dashboard", function (req, res) {
    res.render("dashboard");
  });

  // game list
  app.get("/chooseGame", function (req, res) {
    res.render("chooseGame");
  });

  // users' games list
  app.get("/usersGames", function (req, res) {
    res.render("usersGames");
  });

  // play game
  app.get("/playGame", function (req, res) {
    res.render("playGame");
  });

  // admin game list
  app.get("/adminGameList", function (req, res) {
    res.render("adminGameList");
  });

  // admin edit
  app.get("/adminEdit", function (req, res) {
    res.render("adminEdit");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
