$(document).ready(function() {
  var url = window.location.search;
  var gameID;
  $("#viewLeaderboardModal").on("click", function() {
    $("#leaderBoardModal").modal("show");
  });

  $(".taskBadge").on("click", function() {
    $("#playGameTaskItemModal").modal("show");
  });
  // /api/games/:id

  //gameID = url.split
  console.log(url)
});
