$(document).ready(function() {
  $.get("/api/games", function(dbGames) {
    dbGames.forEach(function(item) {
      var isDraft;
      if (item.draft_status) {
        isDraft = "Draft";
      } else {
        isDraft = "Active";
      }
      var eachCard = $("<div class='card text-white mb-3 editGameCard'></div>");
      $(eachCard).attr("data-id", item.id);

      $(eachCard).html(
        "<div class='card-body'><h4 class='card-title editGameCardTitle'>" +
          item.title +
          "</h4><h5 class='card-title editGameCardStatus'>" +
          isDraft +
          "</h5></div>"
      );

      $(".gameListColumns").append(eachCard);
    });
  });

  $("body").on("click", ".editGameCard", function() {
    var gameID = $(this).attr("data-id");
    window.location.replace("/adminEdit/game_id=" + gameID);
  });

  $("#adminOnlyButton").on("click", function() {
    window.location.replace("/adminEdit");
  });
});
