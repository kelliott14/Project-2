var backgroundColor = ["#2a8e9d", "#ff5245", "#374050", "#ffc938"];
$(document).ready(function() {
  $(".card").on("click", function() {
    var gameId = $(this).attr("data-value");
    window.location.replace("/playGame/" + gameId);
  });
});
