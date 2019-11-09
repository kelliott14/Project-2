/* eslint-disable camelcase */
var db = require("../models");

module.exports = function(app) {
  // Get all games
  app.get("/api/games", function(req, res) {
    db.Game.findAll({}).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  // Get a specific game
  app.get("/api/games/:id", function(req, res) {
    db.Game.findOne({ where: { id: req.params.id } }).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  // Saving a new game
  app.post("/api/games", function(req, res) {
    db.Game.create({
      title: req.body.title,
      draft_status: req.body.draft_status,
      game_length: req.body.game_length
    }).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  // Delete a game by id
  app.delete("/api/games/:id", function(req, res) {
    db.Game.destroy({ where: { id: req.params.id } }).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  //Updating game
  app.put("/api/games", function(req, res) {
    db.Game.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  // Get a specific task
  app.get("/api/tasks/:id", function(req, res) {
    db.Task.findOne({ where: { id: req.params.id } }).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  // Saving a new task
  app.post("/api/games/tasks", function(req, res) {
    db.Task.create({
      game_id: req.body.game_id,
      title: req.body.title,
      description: req.body.description,
      points: req.body.points
    }).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  // Delete a task by id
  app.delete("/api/games/tasks/:id", function(req, res) {
    db.Task.destroy({ where: { id: req.params.id } }).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  //Update task
  app.put("/api/games/tasks", function(req, res) {
    db.Task.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbTask) {
      res.json(dbTask);
    });

    app.post("/api/login", function(req, res) {});
  });
};
