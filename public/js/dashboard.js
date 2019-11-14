var backgroundColor = ["#2a8e9d", "#ff5245", "#374050", "#ffc938"];
$(document).ready(function() {
  //incorrect api route. Open Games
  $.get("/api/games", function(dbGames) {
    var j = 0;
    for (var i = 0; i < dbGames.length; i++) {
      var eachCard = $(
        "<div class='card text-white mb-3 dashboardCard'></div>"
      );
      $(eachCard).attr("data-id", dbGames[i].id);
      $(eachCard).html(
        "<div class='card-body'><h4 class='card-title dashboardGameCardTitles'>" +
          dbGames[i].title +
          "<span class='badge openGameBadge'>" +
          timeLeft +
          " left</span>" +
          "</h5><div class='progress'><div class='progress-bar' role='progressbar' style='width: " +
          widthPercent +
          "aria-valuenow=" +
          valueNow +
          "aria-valuemin='0' aria-valuemax='100'>" +
          statusBar +
          "</div>"
      );

      if (j === 4) {
        j = 0;
      }
      $(eachCard).css("background-color", backgroundColor[j]);
      $(".dashboardOpen").append(eachCard);
      j++;
    }
  });
});
