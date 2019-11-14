var backgroundColor = ["#2a8e9d", "#ff5245", "#374050", "#ffc938"];

$(document).ready(function() {
  /* eslint-disable prettier/prettier */
  //modal

  $.get("/api/games", function(dbGames) {    
    var j = 0;
    for (var i = 0; i < dbGames.length; i++) {
      var eachCard = $("<div class='card text-white mb-3 chooseGameCard'></div>");
      $(eachCard).attr("data-id", dbGames[i].id);
      $(eachCard).html("<div class='card-body'><h4 class='card-title chooseGameCardTitles'>"
          + dbGames[i].title + "</h4><h5 class='card-title chooseGameCardTime'>"
          + dbGames[i].ends_at + "</h5></div>");
          
      if (j === 4) {
        j = 0;  
      }
      $(eachCard).css("background-color", backgroundColor[j]);
      $(".gameListColumns").append(eachCard);
      j++;
    }
  });

  $("body").on("click", ".card-body", function() {
    var gameTitle = $(this).children("h4").text();
    var gameTime = $(this).children("h5").text();
    // eslint-disable-next-line camelcase
    var gameID = {game_id: $(this).parent().attr("data-id")};
    var thisUserID = 1;
    //userID update
    $("#chooseGameModalTitle").text(gameTitle);
    $("#chooseGameModalTime").text("You have " + gameTime + "to complete");
    
    $("#chooseGameSelectedGame").modal("show");

    $("#chooseGameStartGame").on("click", function() {
      $.ajax("/api/users/" + thisUserID + "/joingame", {
        type: "POST",
        data: gameID
      }).then(
        function(data) {
          window.location.replace("/playGame/" + data);
          //api route to display /playGame for the individual game?
        }
      );
    });
  });

  
});

