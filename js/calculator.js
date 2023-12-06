$(document).ready(function() {
    $.ajax({
        url: 'https://1o6d6cij23.execute-api.us-east-1.amazonaws.com/test/resource?transactionId=make&makeId=NULL&modelId=NULL&yearId=NULL',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Success:', data);
            updateMakeDropdown(data)
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', xhr.responseText);
            console.error('Status:', status);
            console.error('Error:', error);
        }
    });
});

function getModels() {
    let selectedMake = $('#make-dropdown-button').text()
    $.ajax({
        url: `https://1o6d6cij23.execute-api.us-east-1.amazonaws.com/test/resource?transactionId=NULL&makeId=${selectedMake}&modelId=NULL&yearId=NULL`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Success:', data);
            updateModelDropdown(data)
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', xhr.responseText);
            console.error('Status:', status);
            console.error('Error:', error);
        }
    });
}

function getYears() {
    let selectedModel = $('#model-dropdown-button').text()
    $.ajax({
        url: `https://1o6d6cij23.execute-api.us-east-1.amazonaws.com/test/resource?transactionId=NULL&makeId=NULL&modelId=${selectedModel}&yearId=NULL`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Success:', data);
            updateYearDropdown(data)
            console.log(this.url)
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', xhr.responseText);
            console.error('Status:', status);
            console.error('Error:', error);
        }
    });
}

$(document).ready(function() {
    $('#state-dropdown').on('click', '.dropdown-item', function(event) {
        event.preventDefault();
        console.log("Dropdown item clicked:", $(this).text());
        $('#drop-down-button').text($(this).text());
    });
});

function updateMakeDropdown(makes) {
    let $dropdown = $('#make-dropdown');
    $dropdown.empty();
    makes.forEach(function(make) {
        let makeName = make[1];
        $dropdown.append($('<li>').append($('<a>').attr('href', '#').addClass('dropdown-item').text(makeName)));
    });
}

function updateModelDropdown(models) {
    let $dropdown = $('#model-dropdown');
    $dropdown.empty();
    models.forEach(function(model) {
        let modelName = model[0];
        $dropdown.append($('<li>').append($('<a>').attr('href', '#').addClass('dropdown-item').text(modelName)));
    });
}

function updateYearDropdown(years) {
    let $dropdown = $('#year-dropdown');
    $dropdown.empty();
    years.forEach(function(year) {
        let yearName = year[0];
        $dropdown.append($('<li>').append($('<a>').attr('href', '#').addClass('dropdown-item').text(yearName)));
    });
}

$('#make-dropdown').on('click', '.dropdown-item', function(event) {
        event.preventDefault();
        console.log("Dropdown item clicked:", $(this).text());
        $('#make-dropdown-button').text($(this).text());
        $('#model-dropdown-button').text("Model")
        $('#year-dropdown-button').text("Year")
        getModels()
});

$('#model-dropdown').on('click', '.dropdown-item', function(event) {
        event.preventDefault();
        console.log("Dropdown item clicked:", $(this).text());
        $('#model-dropdown-button').text($(this).text());
        $('#year-dropdown-button').text("Year")
        getYears()
});

$('#year-dropdown').on('click', '.dropdown-item', function(event) {
        event.preventDefault();
        console.log("Dropdown item clicked:", $(this).text());
        $('#year-dropdown-button').text($(this).text());
});

$(document).on('click', '#submit-btn', function(event) {
    event.preventDefault();
    let selectedMake = $('#make-dropdown-button').text()
    let selectedModel = $('#model-dropdown-button').text()
    let selectedYear = $('#year-dropdown-button').text()
    let count = 0
    $('#risk-box').empty();

    $.ajax({
        url: `https://1o6d6cij23.execute-api.us-east-1.amazonaws.com/test/resource?transactionId=NULL&makeId=${selectedMake}&modelId=${selectedModel}&yearId=${selectedYear}`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Success:', data);
            $('#informationbox').empty();
            if (data.length > 0) {
                data.forEach((item, index) => {
                    count++
                    $('#informationbox').append(`<p>${index + 1}) ${item}</p>`)
                    if(count < 5 && count > 0){
                        $('#risk-box').append(`<img src="images/low%20risk%20image.jpg" alt="lowrisk">`).addClass("w-15-other w-25-sm")
                    }
                });
            } else {
            $('#informationbox').text('No data found')
        }
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', xhr.responseText);
            console.error('Status:', status);
            console.error('Error:', error);
        }
    });
});


$(document).on('click', '#add-admin', function(event) {
    event.preventDefault();
    let username = $('#username')
    let password = $('#password')

    $.ajax({
        url: `https://1o6d6cij23.execute-api.us-east-1.amazonaws.com/test/addAdmin?userName=${username}&userPassword=${password}`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Success:', data);
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', xhr.responseText);
            console.error('Status:', status);
            console.error('Error:', error);
        }
    });
});

$(document).on('click', '#make-admin', function(event) {
    event.preventDefault();
    let username = $('#username')
    let password = $('#password')

    $.ajax({
        url: `https://1o6d6cij23.execute-api.us-east-1.amazonaws.com/test/makeAdmin?userName=${username}&userPassword=${password}`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Success:', data);
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', xhr.responseText);
            console.error('Status:', status);
            console.error('Error:', error);
        }
    });
});