//5z9ka4r0we9hpxZ8lskGF9UYOQ2xBXGb
//http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5

var tags = [];

function gifInfo() {

    var tag = $(this).attr("data-name");

    var queryURL = ("http://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=5z9ka4r0we9hpxZ8lskGF9UYOQ2xBXGb&limit=10");

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var gifs = response.data;
        $(".gif-connector").empty();
        $(".gif-view").empty();

        var active2 = $("<li>");
        active2.addClass("active");
        active2.attr("data-target", "#carouselExampleIndicators");
        active2.attr("data-slide-to", "0");

        $(".gif-connector").append(active2);

        var active1 = $("<div>");
        active1.addClass("carousel-item active");
        active1.append(
            "<img class='d-block w-100 gif' src='" + gifs[0].images.original_still.url + "' data-still='" + gifs[0].images.original_still.url + "' data-animate='" + gifs[0].images.original.url + "' data-state='still'>" +
            "<div class='carousel-caption d-none d-md-block'>" +
            "<h5> " + gifs[0].title + " </h5>" + "<p>Rating : " + gifs[0].rating + " </p>" +
            "</div>"
        );

        $(".gif-view").append(active1);


        for (var k = 1; k < gifs.length; k++) {
            var gifConnector = $("<li>");
            gifConnector.attr("data-target", "#carouselExampleIndicators");
            gifConnector.attr("data-slide-to", "0");

            $(".gif-connector").append(gifConnector);

            var gifView = $("<div>");
            gifView.addClass("carousel-item");
            gifView.append(
                "<img class='d-block w-100 gif' src='" + gifs[k].images.original_still.url + "' data-still='" + gifs[k].images.original_still.url + "' data-animate='" + gifs[k].images.original.url + "' data-state='still'>" +
                "<div class='carousel-caption d-none d-md-block'>" +
                "<h5> " + gifs[k].title + " </h5>" + "<p>Rating : " + gifs[k].rating + " </p>" +
                "</div>"
            );

            $(".gif-view").append(gifView);
        }

        $(".gif").on("click", function () {

            var state = $(this).attr("data-state");
        
            if (state === "still") {
                $(this).attr("data-state", "animate")
                $(this).attr("src", $(this).attr("data-animate"));
            } else if (state === "animate") {
                $(this).attr("data-state", "still")
                $(this).attr("src", $(this).attr("data-still"));
            };

        });


    });


}

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < tags.length; i++) {

        var a = $("<button>");

        a.addClass("tag btn btn-danger btn-md btn-block");

        a.attr("data-name", tags[i]);

        a.text(tags[i]);

        $("#buttons-view").append(a);
    }
}

$("#add-tag").on("click", function (event) {
    event.preventDefault();

    var tag = $("#tag-input").val().trim();

    tags.push(tag);

    console.log(tags);

    renderButtons();

});

$(document).on("click", ".tag", gifInfo);

renderButtons();

$("#clear").on("click", function() {

    $(".gif-connector").empty();
    $(".gif-view").empty();
    $("#button-view").empty();

})