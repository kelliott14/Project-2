$(document).ready(function() {
  /* eslint-disable prettier/prettier */
  //modal

  $.get("/api/games", function(dbGames) {
    dbGames.forEach(function(item){
      var eachCard = $("<div class='card text-white mb-3 chooseGameCard'></div>");
      $(eachCard).attr("data-id", item.id);
      
      $(eachCard).html("<div class='card-body'><h4 class='card-title chooseGameCardTitles'>"
        + item.title + "</h4><h5 class='card-title chooseGameCardTime'>"
        + item.ends_at + "</h5></div>");  
    
      $(".gameListColumns").append(eachCard);
    });

  });

  $("body").on("click", ".card-body", function() {
    var gameTitle = $(this).children("h4").text();
    var gameTime = $(this).children("h5").text();
    $("#chooseGameModalTitle").text(gameTitle);
    $("#chooseGameModalTime").text("You have " + gameTime + "to complete");
    
    $("#chooseGameSelectedGame").modal("show");

  });

  
  
});

