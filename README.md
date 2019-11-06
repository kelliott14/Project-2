# Project-2

## User stories
* As a USER, I can login with my username and password
* As a USER, I can start an upcoming game on the home screen
* As a USER, I can continue the current game from the home screen
* As a USER, I can see the current task description and title
* As a USER, I can complete the current task and see the next task
* As a USER, I get notified when I finished the last task
* As a USER, I can see my current score
* As an ADMIN, I can login with my username and password
* As an ADMIN, I can see a list of all games, finsihed, running and draft
* As an ADMIN, I can add a game with a title
* As an ADMIN, I can see details of upcoming games
* As an ADMIN, I can remove a task from an upcoming game
* As an ADMIN, I can add a task to an upcoming game
    * title
    * description
    * points
* As an ADMIN, I can change data of a task of an upcoming game
    * title
    * description
    * points
* As an ADMIN, I can see the gamers scroes of a game in progress
* As a USER, I can see a list of previous games

## Screens
### Login
* Application title
* username input
* password input
* login button - if player leads to player home screen and admin games screen otherwise

### Player home screen
* Link to previous games - MVP+ - leads to previous games screen
* Link to
  * Start - if no current game - links to first task of game
  * Continue - if current game but not finished by player - links to current task of game
  * Results - if current game finished by player - links to game results screen

### Player task screen
* link back to player home screen
* title
* description
* done button - MVP - leeds to next player task screen or done screen
* upload photo - MVP+

### Done screen
* "Done" label
* link to results screen

### Results screen
* title of game
* list of player and score ordered by rank

### Previous games screen
* MVP+

### Admin games screen
* "Games" label
* list of games: finsihed, running and draft
* per game
  * title
  * number of players (optional)
  * status: finsihed, running, draft
  * actions: 
    * edit (draft) - leads to edit game screen
    * delete (finished, draft)
    * view (finsihed, running) - leads to view game screen
* add button - leads to create game screen

### Create game screen
* could be a modal dialog
* "Create game" label
* title input
* "create" button - leads to edit game screen

### Edit game screen
* "Game: $title" label
* list of tasks
* per task
  * title
  * description
  * actions
    * delete
    * edit
* add task - leads to create task screen

### View game screen
* same as Edit game screen but no other actions than
  * view - leads to view task screen

### Create task screen
* "create task" label
* title input
* description input
* add button

### Edit task screen
* same as create task screen but with prefilled inputs and "save" button and "edit task" label
* list of player and score ordered by rank

### View task screen
* could be dialog
* list of players
* per player
  * status: not yet started, started, finished

## Database Model
```sql
CREATE TABLE user
(
    id int NOT NULL AUTO_INCREMENT,
    user_name varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `admin` BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);
```
```sql
CREATE TABLE game
(
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    -- possible values: F - Finished, R - Running, D - Draft
    status varchar(1) NOT NULL,
    PRIMARY KEY (id)
);
```
* one game has many tasks
* one task has one game
* therefore game to task is a one-to-many mapping and
* task to game a many-to-one mapping
* the "many" side owns the reference to the "one" side (`task.game_id`)
```sql
CREATE TABLE task
(
    id int NOT NULL AUTO_INCREMENT,
    game_id int NOT NULL,
    title varchar(255) NOT NULL,
    description varchar(1000) NOT NULL,
    PRIMARY KEY (id)
);
```
* one user has many games
* one game has many users
* therefore user to game is a many-to-many mapping
```sql
CREATE TABLE user_game
(
    id int NOT NULL AUTO_INCREMENT,
    user varchar(255) NOT NULL,
    game varchar(255) NOT NULL,
    points INT NOT NULL DEFAULT 0
);
```

## API and pages (aka screens)

### Screens
| path | screen |
|---|---|
|`/login`| login |
|`/`| player home |
|`/task/:task_id`| player task and done screen |
|`/results/:game_id`| results |
|`/admin/games`| games |
|`/admin/game`| create game |
|`/admin/game/:game_id`| edit game |
|`/admin/game/:game_id/task`| create task |
|`/admin/game/:game_id/task/:task_id`| edit task |

### API
```
VERB https://$domain/$api_path/$entity_path/:attribute_name?parameter_name=:parameter_value
VERB /$api_path/$entity_path/:attribute_name?parameter_name=:parameter_value
```
* possible verbs
  * `GET`
  * `POST`
  * `DELETE`
  * `PUT`

#### Games
| verb | path | description |
|---|---|---|
| `GET` | `/api/game` | list all games returns a `GameList` |
| `GET` | `/api/game/:id` | specific game, returns a `Game` |
| `POST` | `/api/game` | add a game, takes a `CreateGameRequest` returns the newly created game `Game` |
| `PUT` | `/api/game/:id` | edit a game, takes a `Game` and returns the updated `Game` |
| `DELETE` | `/api/game/:id` | deletes a game, returns nothing |

`Game`
```json
{
    "id": 823535,
    "title": "First game",
    "tasks": [],
    "player": []
}
```
`Player`
```json
{
    "userName": "Liz",
    "score": 42
}
```
`GameList`
```json
{
    "games": []
}
```
`CreateGameRequest`
```json
{
    "title": "First game"
}
```

#### Task
| verb | path | description |
|---|---|---|
| `GET` | `/api/task/:id` | specific task, returns a `Task` |
| `POST` | `/api/game/:id/task` | add a task, takes a `CreateTaskRequest` and returns the newly created game `Task` |
| `PUT` | `/api/game/:id/task/:id` | edit a task, takes a `Task` and returns the updated `Task` |
| `DELETE` | `/api/game/:id/task/:id` | deletes a game, returns nothing |

`Task`
```json
{
    "id": 3,
    "gameId": 823535,
    "title": "Go Home",
    "description": "Leave the office, take the bus and buy some icecream"
}
```
`CreateTaskRequest`
```json
{
    "title": "Go Home",
    "description": "Leave the office, take the bus and buy some icecream"
}
```

#### Login
| verb | path | description |
|---|---|---|
| `POST` | `/api/login` | takes a `LoginRequest` and returns `LoginResponse` |

`LoginRequest`
```json
{
    "userName": "liz",
    "passwoerd": "geheim"
}
```
`LoginResponse`
```json
{
    "success": true
}
```