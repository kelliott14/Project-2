/* eslint-disable camelcase */
var db = require("../models");

module.exports = function(app) {
  // Get all games: user choosing a game to play
  app.get("/api/games", function(req, res) {
    db.Game.findAll({}).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  // Get a specific game
  app.get("/api/games/:id", function(req, res) {
    db.Game.findByPk(req.params.id).then(function(dbGame) {
      if (!dbGame) {
        res.status(404).send("Not found.");
      }
      db.Task.findAll({ where: { id: req.params.id } }).then(function(dbTasks) {
        res.json(Object.assign({ tasks: dbTasks }, dbGame.dataValues));
      });
    });
  });

  // Saving a new game. Admin creating a new game.
  app.post("/api/games", function(req, res) {
    db.Game.create({
      title: req.body.title,
      draft_status: req.body.draft_status,
      ends_at: req.body.ends_at
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

  // Updating game
  app.put("/api/games/:id", function(req, res) {
    db.Game.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function() {
      db.Game.findByPk(req.params.id).then(function(dbGame) {
        res.json(dbGame);
      });
    });
  });

  // Get a specific task
  app.get("/api/tasks/:id", function(req, res) {
    db.Task.findByPk(req.params.id).then(function(dbTask) {
      if (!dbTask) {
        res.status(404).send("Not found.");
      }
      res.json(dbTask);
    });
  });

  // Saving a new task
  app.post("/api/tasks", function(req, res) {
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
  app.delete("/api/tasks/:id", function(req, res) {
    db.Task.destroy({ where: { id: req.params.id } }).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  //Update task
  app.put("/api/tasks/:id", function(req, res) {
    db.Task.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function() {
      db.Task.findByPk(req.params.id).then(function(dbTask) {
        res.json(dbTask);
      });
    });
  });

  //To do: wait for passport.js
  // app.post("/api/login", function(req, res) {});

  // Joins a game and copies all tasks of that game for that user.
  // Request: body {"game_id": number}
  // Response: either existing UserGame or newly joined UserGame
  app.post("/api/users/:user_id/joingame", function(req, res) {
    db.UserGame.findOne({
      where: {
        user_id: req.params.user_id,
        game_id: req.body.game_id
      }
    }).then(function(dbUserGame) {
      if (!dbUserGame) {
        db.UserGame.create({
          user_id: req.params.user_id,
          game_id: req.body.game_id
        }).then(function(newDbUserGame) {
          db.Task.findAll({
            where: {
              game_id: req.body.game_id
            }
          }).then(function(dbTasks) {
            dbTasks.forEach(function(dbTask) {
              db.UserTask.create({
                user_id: req.params.user_id,
                task_id: dbTask.id
              });
            });
            res.json(newDbUserGame);
          });
        });
      } else {
        res.json(dbUserGame);
      }
    });
  });

  // Returns all tasks of all games a user has joined
  app.get("/api/users/:user_id/tasks", function(req, res) {
    db.UserTask.findAll({
      where: {
        user_id: req.params.user_id
      }
    }).then(function(dbUserTasks) {
      res.json(dbUserTasks);
    });
  });

  // Sets a UserTask to done and increments the UserGame's points by the Task's points.
  app.put("/api/users/:user_id/tasks/:task_id", function(req, res) {
    if (req.body.task_done) {
      db.UserTask.findOne({
        where: {
          user_id: req.params.user_id,
          task_id: req.params.task_id
        }
      }).then(function(dbUserTask) {
        if (!dbUserTask) {
          res.status(404).send("Not found.");
        } else {
          if (!dbUserTask.task_done) {
            db.UserTask.update(req.body, {
              where: {
                user_id: req.params.user_id,
                task_id: req.params.task_id
              }
            }).then(function() {
              db.Task.findByPk(req.params.task_id).then(function(dbTask) {
                if (!dbTask) {
                  res.status(500).send("No Task for UserTask");
                } else {
                  db.UserGame.findOne({
                    where: {
                      user_id: req.params.user_id,
                      game_id: dbTask.game_id
                    }
                  }).then(function(dbUserGame) {
                    if (!dbUserGame) {
                      res.status(500).send("No Task for UserTask");
                    } else {
                      db.UserGame.update(
                        {
                          game_points: dbTask.points + dbUserGame.game_points
                        },
                        {
                          where: {
                            user_id: req.params.user_id,
                            game_id: dbTask.game_id
                          }
                        }
                      ).then(function() {
                        db.UserTask.findOne({
                          where: {
                            user_id: req.params.user_id,
                            task_id: req.params.task_id
                          }
                        }).then(function(updatedDbUserTask) {
                          res.json(updatedDbUserTask);
                        });
                      });
                    }
                  });
                }
              });
            });
          } else {
            res.json(dbUserTask);
          }
        }
      });
    }
  });
};
