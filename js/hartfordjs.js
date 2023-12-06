$(document).on('click', '#login', function(event) {
     event.preventDefault();
     checkCredentials()
});

$(document).on('click', '#register', function(event) {
     event.preventDefault();
     registerUser()
});

function checkCredentials () {
    const username = $('#username').val()
    const password = $('#password').val()

    $.ajax({
        url: `https://1o6d6cij23.execute-api.us-east-1.amazonaws.com/test/login?userId=${username}&userPass=${password}`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Success:', data);
            if(data[0] === 1) {
            //console.log('ADMIN');
            window.location.href = "admin-page.html"
            } else if(data[0] === 0) {
            //console.log('USER');
            window.location.href = "user-page.html"
            } else {
            console.log('Unexpected response:', data);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', xhr.responseText);
            console.error('Status:', status);
            console.error('Error:', error);
        }
    });
}

function registerUser() {
    const regUsername = $('#reg-username').val()
    const regPass = $('#reg-password').val()

    $.ajax({
        url: `https://1o6d6cij23.execute-api.us-east-1.amazonaws.com/test/adduser?userName=${regUsername}&userPassword=${regPass}`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Success:', data);
            alert(data)
            $('#reg-username').val("")
            $('#reg-password').val("")
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', xhr.responseText);
            console.error('Status:', status);
            console.error('Error:', error);
        }
    });
}