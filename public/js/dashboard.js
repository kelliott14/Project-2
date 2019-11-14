var backgroundColor = ["#2a8e9d", "#ff5245", "#374050", "#ffc938"];
$(document).ready(function() {
  $.get("/api/games", function(dbGames) {
    var j = 0;
    for (var i = 0; i < dbGames.length; i++) {
      var eachCard = $(
        "<div class='card text-white mb-3 dashboardCard'></div>"
      );
      $(eachCard).attr("data-id", dbGames[i].id);
      $(eachCard).html(
        "<div class='card-body'><h4 class='card-title chooseGameCardTitles'>" +
          dbGames[i].title +
          "</h4><h5 class='card-title chooseGameCardTime'>" +
          dbGames[i].ends_at +
          "</h5></div>"
      );

      if (j === 4) {
        j = 0;
      }
      $(eachCard).css("background-color", backgroundColor[j]);
      $(".gameListColumns").append(eachCard);
      j++;
    }
  });
});
