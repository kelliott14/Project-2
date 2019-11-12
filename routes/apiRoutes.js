/* eslint-disable camelcase */
var db = require("../models");

module.exports = function (app) {
    // Get all games
    app.get("/api/games", function (req, res) {
        db.Game.findAll({}).then(function (dbGame) {
            res.json(dbGame);
        });
    });

    // Get a specific game
    app.get("/api/games/:id", function (req, res) {
        db.Game.findByPk(req.params.id).then(function (dbGame) {
            if (!dbGame) {
                res.status(404).send("Not found.");
            }
            db.Task.findAll({
                where: {
                    id: req.params.id
                }
            }).then(function (dbTasks) {
                res.json(Object.assign({
                    tasks: dbTasks
                }, dbGame.dataValues));
            });
        });
    });

    // Saving a new game
    app.post("/api/games", function (req, res) {
        db.Game.create({
            title: req.body.title,
            draft_status: req.body.draft_status,
            ends_at: req.body.ends_at
        }).then(function (dbGame) {
            res.json(dbGame);
        });
    });

    // Delete a game by id
    app.delete("/api/games/:id", function (req, res) {
        db.Game.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbGame) {
            res.json(dbGame);
        });
    });

    // Updating game
    app.put("/api/games/:id", function (req, res) {
        db.Game.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(function () {
            db.Game.findByPk(req.params.id).then(function (dbGame) {
                res.json(dbGame);
            });
        });
    });

    // Get a specific task
    app.get("/api/tasks/:id", function (req, res) {
        db.Task.findByPk(req.params.id).then(function (dbTask) {
            if (!dbTask) {
                res.status(404).send("Not found.");
            }
            res.json(dbTask);
        });
    });

    // Saving a new task
    app.post("/api/tasks", function (req, res) {
        db.Task.create({
            game_id: req.body.game_id,
            title: req.body.title,
            description: req.body.description,
            points: req.body.points
        }).then(function (dbGame) {
            res.json(dbGame);
        });
    });

    // Delete a task by id
    app.delete("/api/tasks/:id", function (req, res) {
        db.Task.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    });

    //Update task
    app.put("/api/tasks/:id", function (req, res) {
        db.Task.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function () {
            db.Task.findByPk(req.params.id).then(function (dbTask) {
                res.json(dbTask);
            });
        });
    });

    app.put("/api/user/taskdone", function (req, res) {
        // input {task_id: number, user_id: number} // user_id should come from passport.js
    });
    app.put("/api/user/joingame", function (req, res) {
        // input {game_id: number, user_id: number} // user_id should come from passport.js
    });
};