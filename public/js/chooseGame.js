$(document).ready(function() {
  /* eslint-disable prettier/prettier */
  //modal
  $(".card-body").on("click", function() {
    $("#chooseGameSelectedGame").modal("show");
  });

  var games;

  //function to call the games data from the db
  function getGames() {
    $.get("/api/games", function(data) {
      games = data;
        
      createGameCards(games);
    });
  }

  //function to create a card for each game
  function createGameCards(games) {
      
  }







});

