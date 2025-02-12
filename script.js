document.addEventListener("DOMContentLoaded", function() {
    const backButton = document.getElementById("backButton");

    if (backButton) {
        backButton.addEventListener("click", function() {
            window.history.back();
        });
    }
});
