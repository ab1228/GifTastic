var giphys = ["Dogs", "Grandma", 'Cats', "Lions", 'Bears', 'Turtles', 'Tigers'];

function renderButtons() {

    $("#buttons-view").empty();
    //Loops through the array of giphys
    for (var i = 0; i < giphys.length; i++) {

        var a = $("<button>");
        a.addClass("giphy");
        a.attr("data-name", giphys[i]);
        a.text(giphys[i]);
        $("#buttons-view").append(a);
    }
}

renderButtons();

$("#add-giphy").on("click", function (event) {
    event.preventDefault();

    var giphy = $("#giphy-input").val().trim();

    giphys.push(giphy);

    renderButtons();
});



function displaygiphyInfo() {
    $('#giphys-view').empty('');
    var giphy = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";



    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var image = $('<img>');
            image.attr('src', results[i].images.fixed_height_still.url);
            image.attr('data-still', results[i].images.fixed_height_still.url)
            image.attr('data-animate', results[i].images.fixed_height.url)
            image.attr('data-move', 'still')
            $("#giphys-view").append(image);
        }
    });

}

$(document).on("click", "img", function () {

    if ($(this).attr('data-move') === 'still') {
        $(this).attr('src', $(this).attr('data-animate'))
        $(this).attr('data-move', 'animate')
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-move', 'still')
    }



})


$(document).on("click", ".giphy", displaygiphyInfo);


