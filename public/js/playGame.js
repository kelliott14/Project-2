$(document).ready(function() {
  $("#viewLeaderboardModal").on("click", function() {
    console.log("clicked");
    $("#leaderBoardModal").modal("show");
  });

  $(".taskBadge").on("click", function() {
    console.log("clicked");
    $("#playGameTaskItemModal").modal("show");
  });
});
