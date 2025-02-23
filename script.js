document.addEventListener("DOMContentLoaded", function() {
    const backButton = document.getElementById("backButton");

    if (backButton) {
        backButton.addEventListener("click", function() {
            window.history.back();
        });
    }
});
window.addEventListener("load", function () {
    let cssLink = document.querySelector("link[rel='stylesheet']");
    if (cssLink) {
        cssLink.href = cssLink.href.split("?")[0] + "?v=" + new Date().getTime();
    }
});

