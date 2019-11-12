$(document).ready(function() {
  $("#taskAdd").on("click", function() {
    console.log("clicked");
    $("#addEditTask").modal("show");
  });

  $(".activateGame").on("click", function() {
    console.log("clicked");
    $("#activateGame").modal("show");
  });
});
