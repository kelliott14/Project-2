$(document).ready(function() {
  $.get("/api/games", function(games) {
    games.forEach(function(game) {
      var eachGame = $(
        "<div class='card text-white mb-3 editGameCard' style='background-color: #ff5245'></div>"
      );
      $(eachGame).attr("data-id", game.id);

      $(eachGame).html(
        "<div class='card-body'><h4 class='card-title editGameCardTitle'>" +
          game.title +
          "</h4><h5 class='card-title editGameCard'>Edit</h5><h5 class='card-title editGameCardStatus'>" +
          (game.draft_status ? "Draft" : "Active") +
          "</h5></div>"
      );

      $(".gameList").append(eachGame);
    });
  });
});
