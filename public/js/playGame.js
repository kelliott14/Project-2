$(document).ready(function() {
  function calculateRemainingTime(startingTime, duration) {
    var endingTime = moment(startingTime)
      .add(duration, "hours")
      .format();
    var currentTime = moment().format();
    return moment(endingTime).diff(moment(currentTime), "hours");
  }
  var startTime;
  var thisGame = $("#gameTitle").attr("gameID");
  var thisUsergame = $("#gameTitle").attr("usergameID");
  console.log(thisGame)
  $.ajax("/api/users/:user_id/games/" + thisGame, {
    type: "GET",
    data: {
      GameID: thisGame
    }
  }).then(function(data) {
    startTime = data.start_time;
    $.ajax("/api/games/" + thisGame, {
      type: "GET"
    }).then(function(gameData) {
      var gameLength = gameData.game_length;
      var timeRemaining = calculateRemainingTime(startTime, gameLength);
      $("#timeRemaining").text(timeRemaining + " hrs");
    });
  });

  $("#viewLeaderboardModal").on("click", function() {
    $("#leaderBoardModal").modal("show");
  });

  $(".taskBadge").on("click", function() {
    var thisTaskID = $(this).attr("data-value");
    var doneValue = $(this).attr("task-done");
    if (doneValue == 0) {
      doneValue = true;
    }else {
      doneValue = false;
    }
    $.ajax("/api/tasks/" + thisTaskID, {
      type: "GET"
    }).then(function(data) {
      $("#taskTitle").text(data.title);
      $("#taskDescription").text(data.description);
      $("#completeTaskItem").attr("data-value", thisTaskID);
      $("#completeTaskItem").attr("done_value", doneValue);
    });

    $("#playGameTaskItemModal").modal("show");
  });

  $("#completeTaskItem").on("click", function() {
    var thisTaskID = $(this).attr("data-value");
    var doneValue = $(this).attr("done_value");
    console.log(doneValue);
    $.ajax("/api/users/:user_id/tasks/" + thisTaskID, {
      type: "PUT",
      data: {
        task_done: doneValue
      }
    }).then(function() {
      location.reload();
    });
  });
});
