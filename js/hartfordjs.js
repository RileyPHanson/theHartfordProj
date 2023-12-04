$(document).on('click', '#login', function(event) {
     event.preventDefault();
     checkCredentials()
});

function checkCredentials () {
    const username = $('#username').val()
    const password = $('#password').val()

    if (username === "Riley" && password === "password") {
        window.location.href = "user-page.html"
    } else if (username === "Admin" && password === "1234") {
        window.location.href = "admin-page.html"
    } else {
        $('#login-feedback').text("invalid credentials")
    }
}