$( document ).ready(function() {
    buttonHit();
    var animalArray = ["cat", "dog", "fish", "whale", "bear", "lion"];

    for(var animal in animalArray) {
        var placeButton = $("<button>").text(animalArray[animal]);
        $("#addButton").append(placeButton);
    }
});

function buttonHit() {
    $("#search").on("click", function() {
        var giphyInput= $("#giphyInput").val();
        if(!giphyInput){
            return;
        }
        var placeButton = $("<button>").text(giphyInput);
         $("#addButton").append(placeButton);
         giphyCall();
    });
}

function giphyCall() {
    $("button").on("click", function() {
        var animal = $(this).text();
        $("#showImage").children().hide();

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
          })
          .done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

              var placeDiv = $("<div class='u-pull-left'>");

              var p = $("<p>").text("Rating: " + results[i].rating);

              var animalImage = $("<img>");
              $(animalImage).attr("still",results[i].images.fixed_height_still.url);
              $(animalImage).attr("animate",results[i].images.fixed_height.url);
              $(animalImage).attr("state","still");
              animalImage.attr("src", results[i].images.fixed_height_still.url);

              placeDiv.append(p);
              placeDiv.append(animalImage);
              $("#showImage").append(placeDiv);
          }
          giphAnimate();
      });
    });
}

function giphAnimate() {
    $("img").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("state", "animate");
      } else {
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("state", "still");
      }
    });
}
