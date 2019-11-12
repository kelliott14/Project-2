$(document).ready(function() {
  /* eslint-disable prettier/prettier */
  //modal
  $(".card-body").on("click", function() {
    var gameTitle = $(this).children("h4").text();
    var gameTime = $(this).children("h5").text();
    $("#chooseGameModalTitle").text(gameTitle);
    $("#chooseGameModalTime").text("You have " + gameTime + "to complete");
    
    $("#chooseGameSelectedGame").modal("show");

  });

  
});

