$(document).on('click', '#login', function(event) {
     event.preventDefault();
     checkCredentials().then(() => {
        console.log("Checking login");
    }).catch(error => {
        console.error("Error logging in:", error);
    });
});

$(document).on('click', '#register', function(event) {
    event.preventDefault();
    registerUser().then(() => {
        console.log("User registration completed.");
    }).catch(error => {
        console.error("An error occurred during user registration:", error);
    });
});


async function checkCredentials(password) {
    const LoginUsername = $('#username').val()
    const LoginPassword = $('#password').val()

    const hashedPassword2 = await hashPassword(LoginPassword);

    $.ajax({
        url: `https://1o6d6cij23.execute-api.us-east-1.amazonaws.com/test/login?userId=${LoginUsername}&userPass=${hashedPassword2}`,
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

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function registerUser() {
    const regUsername = $('#reg-username').val();
    const regPass = $('#reg-password').val();

    const hashedPassword = await hashPassword(regPass);

    $.ajax({
        url: `https://1o6d6cij23.execute-api.us-east-1.amazonaws.com/test/adduser?userName=${regUsername}&userPassword=${hashedPassword}`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Success:', data);
            alert(data);
            $('#reg-username').val("");
            $('#reg-password').val("");
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', xhr.responseText);
            console.error('Status:', status);
            console.error('Error:', error);
        }
    });
}
