
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
    makes.sort(function(a, b) {
        if (a[1] < b[1]) {
            return -1;
        }
        if (a[1] > b[1]) {
            return 1;
        }
        return 0;
    });
    let $dropdown = $('#make-dropdown');
    $dropdown.empty();
    makes.forEach(function(make) {
        let makeName = make[1];
        $dropdown.append($('<li>').append($('<a>').attr('href', '#').addClass('dropdown-item').text(makeName)));
    });
}


function updateModelDropdown(models) {
    models.sort(function(a, b) {
        if (a[0] < b[0]) {
            return -1;
        }
        if (a[0] > b[0]) {
            return 1;
        }
        return 0;
    });

    let $dropdown = $('#model-dropdown');
    $dropdown.empty();
    models.forEach(function(model) {
        let modelName = model[0];
        $dropdown.append($('<li>').append($('<a>').attr('href', '#').addClass('dropdown-item').text(modelName)));
    });
}


function updateYearDropdown(years) {
    years.sort(function(a, b) {
        return a[0] - b[0];
    });

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
        $('#premiumbox').empty()
        $('#informationbox').empty()
        $('#risk-box').empty()
        $('#risk-box').append(`<h3>Risk</h3>`)
});

$('#model-dropdown').on('click', '.dropdown-item', function(event) {
        event.preventDefault();
        console.log("Dropdown item clicked:", $(this).text());
        $('#model-dropdown-button').text($(this).text());
        $('#year-dropdown-button').text("Year")
        getYears()
        $('#premiumbox').empty()
        $('#informationbox').empty()
        $('#risk-box').empty()
        $('#risk-box').append(`<h3>Risk</h3>`)
});

$('#year-dropdown').on('click', '.dropdown-item', function(event) {
        event.preventDefault();
        console.log("Dropdown item clicked:", $(this).text());
        $('#year-dropdown-button').text($(this).text());
        $('#premiumbox').empty()
        $('#informationbox').empty()
        $('#risk-box').empty()
        $('#risk-box').append(`<h3>Risk</h3>`)
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
                });
            } else {
            $('#informationbox').text('No data found')
            }
            calcPremium(count)
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

function  calcPremium (recalls) {
    let premium = 0
    let selectedMake = $('#make-dropdown-button').text()
    let selectedModel = $('#model-dropdown-button').text()
    let selectedYear = $('#year-dropdown-button').text()
    $('#premiumbox').empty()

    $.ajax({
        url: `https://api.nhtsa.gov/complaints/complaintsByVehicle?make=${selectedMake}&model=${selectedModel}&modelYear=${selectedYear}`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Success:', data)
            premium = 1000 + (500 * recalls * .07) + (200 * data.count *.04)
            $('#premiumbox').append(`<h3>Premium $${premium}</h3>`)
            if(premium >= 1000 && premium < 1500){
                $('#risk-box').append(`<img src="images/low%20risk%20image.jpg" alt="lowrisk">`).addClass("w-15-other w-25-sm")
            } else if (premium >= 1500 && premium < 2500) {
                $('#risk-box').append(`<img src="images/medium%20risk%20image.jpg" alt="mediumrisk">`).addClass("w-15-other w-25-sm")
            } else if (premium >= 2500) {
                $('#risk-box').append(`<img src="images/high%20risk%20image.jpg" alt="highrisk">`).addClass("w-15-other w-25-sm")
            }
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', xhr.responseText);
            console.error('Status:', status);
            console.error('Error:', error);
        }

    });
}
