$(document).ready(function () {
    var topics = ["Gilmore Girls", "The Office", "Justified", "It's Always Sunny in Philidelphia"];


    function makeButtons() {
        $("#buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("topic-btn").attr("data-name", topics[i]).text(topics[i]);
            $("#buttons").append(a);
        }
    };

    makeButtons();

    $(".topic-btn").on("click", function() {
        $("#gifs").empty();
        var show = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=NU6o9kt3lIwoKlMXUdDVJ7UzxNz9DyWS&tag=" + show;

        for (var i = 0; i < 11; i++) {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var movingUrl = response.data.fixed_height_small_url;
                var stillUrl = response.data.fixed_height_small_still_url;
                var showImage = $("<img>");
                showImage.attr("src", stillUrl).attr("data-still", stillUrl).attr("data-animate", movingUrl).attr("data-state", "still");
                showImage.attr("alt", "show image").addClass("pic");
                $("#gifs").prepend(showImage);
            });
        }
    });

    function animate() {
        var state = $(this).attr("data-state");
        if (state == "still") { 
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "moving");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    };

    $(document).on("click", ".gif", animate);
});