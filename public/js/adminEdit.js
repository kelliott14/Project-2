$(document).ready(function() {
  var url = window.location.search;
  var gameID;
  $("#taskAdd").on("click", function() {
    console.log("clicked");
    $("#addEditTask").modal("show");
  });

  $(".activateGame").on("click", function() {
    console.log("clicked");
    $("#activateGame").modal("show");
  });

  if (url.indexOf("game_id=") !== -1) {
    gameID = url.split("=")[1];
    getGames(gameID);
  } else {
    //disable tasks section
  }

  function getGames(gameID) {
    $.get("/api/games/" + gameID, function(data) {
      $("#gameTitle").text(data.title);
      //hours and mins??
      getTasks(gameID);
    });
  }

  function getTasks(gameID) {
    $.get("/api/tasks/" + gameID, function(taskData) {
      taskData.forEach(function(item) {
        var eachCard = $(
          "<div class='card text-white mb-3 editTaskCard'></div>"
        );
        $(eachCard).attr("data-id", item.id);
        $(eachCard).html(
          "<div class='card-body'><h4 class='card-title editTaskCardTitle'>" +
            item.title +
            "</h4><h5 class='card-title editTaskCardDescription'>" +
            item.description +
            "</h5><h5 class = 'card-title editTaskCardPoints'>" +
            item.points +
            " points</h5></div>"
        );
        $(".taskListColumns").append(eachCard);
      });
    });
  }

  $("#gameEditAdd").on("click", function(gameID) {
    var newGame = {
      title: $("#gameTitle").val().trim(),
      draft_status: true,
      ends_at: 
    }
    if (!gameID) {
      $.ajax("/api/games", {
        type: "PUT",
        data: newGame
      }).then(
        function() {
          window.location.replace("/")
        }
      )
    }
  })
});
