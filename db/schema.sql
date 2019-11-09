DROP DATABASE IF EXISTS foxhunt_db;

CREATE DATABASE foxhunt_db;

USE foxhunt_db;

CREATE TABLE user
(
    id int NOT NULL AUTO_INCREMENT,
    `user_name` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `admin` BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);
CREATE TABLE game
(
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    draft_status BOOLEAN NOT NULL DEFAULT true,
    `length` TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE task
(
    id int NOT NULL AUTO_INCREMENT,
    game_id int NOT NULL,
    title varchar(255) NOT NULL,
    description varchar(1000) NOT NULL,
    points int(3),
    PRIMARY KEY (id),
    FOREIGN KEY (game_id) REFERENCES game(id)
);
CREATE TABLE user_game
(
    id int NOT NULL AUTO_INCREMENT,
    `user_id` varchar(255) NOT NULL,
    `game_id` varchar(255) NOT NULL,
    `game_points` INT NOT NULL DEFAULT 0,
    `start_time` TIMESTAMP DEFAULT NOW(),
    `game_status` BOOLEAN NOT NULL DEFAULT true,
    PRIMARY KEY (id)
);