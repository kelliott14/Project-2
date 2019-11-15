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
  $.ajax("/api/usergame/" + thisUsergame, {
    type: "GET",
    data: {
      GameID: thisGame
    }
  }).then(function(data) {
    console.log(data)
    startTime = data.start_time;
    $.ajax("/api/games/" + thisGame, {
      type: "GET"
    }).then(function(gameData) {
      var gameLength = gameData.game_length;
      console.log(startTime);
      console.log(gameLength);
      var timeRemaining = calculateRemainingTime(startTime, gameLength);
      $("#timeRemaining").text(timeRemaining + " hrs");
    });
  });

  $("#viewLeaderboardModal").on("click", function() {
    $("#leaderBoardModal").modal("show");
  });

  $(".taskBadge").on("click", function() {
    var thisTaskID = $(this).attr("data-value");
    $.ajax("/api/tasks/" + thisTaskID, {
      type: "GET"
    }).then(function(data) {
      $("#taskTitle").text(data.title);
      $("#taskDescription").text(data.description);
      $("#completeTaskItem").attr("data-value", thisTaskID);
      $("#completeTaskItem").attr("done_value", data.task_done);
    });

    $("#playGameTaskItemModal").modal("show");
  });

  $("#completeTaskItem").on("click", function() {
    var thisTaskID = $(this).attr("data-value");

    console.log(thisTaskID);
    $.ajax("/api/users/:user_id/tasks/" + thisTaskID, {
      type: "PUT",
      data: {
        task_done: false
      }
    }).then(function() {
      location.reload();
    });
  });
});
