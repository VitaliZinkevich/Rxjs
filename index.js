
$( document ).ready(function() {
        
    let userClicksSearchButton = Rx.Observable.fromEvent(
        $("#search-box"),
        'keyup'
)
.map((event) => {
    return $("#search-box").val();
});

//userClicksSearchButton.subscribe((searchTerm) => {
//alert(searchTerm);
//});

// wathc later https://hackernoon.com/using-rxjs-to-handle-http-requests-what-ive-learned-4640aaf4646c

userClicksSearchButton
    .debounceTime(500)
    .filter((searchTerm) => {
        return searchTerm.length >= 5;
    })
    .concatMap((searchTerm) => {
        return Rx.Observable.fromPromise(
            $.get('https://api.github.com/users/' + searchTerm)
        )
    .catch((response) => {
            //renderError(response.statusText);
            return Rx.Observable.empty();
        });
    })
    .take(1)
    .subscribe((response) => {
        renderUser(
            response.login,
            response.html_url,
            response.avatar_url
        );
    });

function renderUser(login, href, imgSrc) {
    let searchResult = $("#search-result");
    searchResult.show();
    searchResult.attr("href", href);
    $("#search-result__avatar").attr('src', imgSrc);
    $('#search-result__login').text(login);
}

function renderError(message) {
    $("#search-result").hide();
    $("#error").show();
    $("#error__message").text(message);
}

});
function newFunction() {
    return 250;
}

