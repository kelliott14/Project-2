$(document).ready(function() {
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
    
    console.log(thisTaskID)
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
