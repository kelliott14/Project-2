$(document).ready(function() {
  $("#viewLeaderboardModal").on("click", function() {
    $("#leaderBoardModal").modal("show");
  });

  $(".taskBadge").on("click", function() {
    $("#playGameTaskItemModal").modal("show");
  });


});
