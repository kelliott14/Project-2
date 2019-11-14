var backgroundColor = ["#2a8e9d", "#ff5245", "#374050", "#ffc938"];
$(document).ready(function() {
  $.get("/api/games", function(dbGames) {
    var j = 0;
    for (i = 0; i < dbGames.length; i++) {
      var eachCard = $("<div class='card text-white mb-3 editGameCard'></div>");
      $(eachCard).attr("data-id", dbGames[i].id);
      var isDraft;
      if (dbGames[i].draft_status) {
        isDraft = "Draft";
        $(eachCard).html(
          "<div class='card-body'><h4 class='card-title editGameCardTitle'>" +
            dbGames[i].title +
            "<img class = 'draftIcon' src='/assets/drafticon.png' width='30' height='30'" +
            "</h4><h5 class='card-title editGameCardStatus'>" +
            isDraft +
            "</h5></div>"
        );
      } else {
        isDraft = "Active";
        $(eachCard).html(
          "<div class='card-body'><h4 class='card-title editGameCardTitle'>" +
            dbGames[i].title +
            "</h4><h5 class='card-title editGameCardStatus'>" +
            isDraft +
            "</h5></div>"
        );
      }

      if (j === 4) {
        j = 0;
      }
      $(eachCard).css("background-color", backgroundColor[j]);
      $(".gameListColumns").append(eachCard);
      j++;
    }
  });
  // <span aria-hidden="true">&times;</span>

  $("body").on("click", ".editGameCard", function() {
    var gameID = $(this).attr("data-id");
    window.location.replace("/adminEdit/game_id=" + gameID);
  });

  $("#adminOnlyButton").on("click", function() {
    window.location.replace("/adminEdit");
  });
});
