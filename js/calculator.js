$(document).ready(function() {
    $.ajax({
        url: 'https://1o6d6cij23.execute-api.us-east-1.amazonaws.com/test/resource?transactionId=make&makeId=NULL',
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
        url: `https://1o6d6cij23.execute-api.us-east-1.amazonaws.com/test/resource?transactionId=NULL&makeId=${selectedMake}`,
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
    $.ajax({
        url: `https://1o6d6cij23.execute-api.us-east-1.amazonaws.com/test/resource?transactionId=NULL&makeId=NULL&`,
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

}

$('#make-dropdown').on('click', '.dropdown-item', function(event) {
        event.preventDefault();
        console.log("Dropdown item clicked:", $(this).text());
        $('#make-dropdown-button').text($(this).text());
        $('#model-dropdown-button').text("Model")
        getModels()
    //
});

$('#model-dropdown').on('click', '.dropdown-item', function(event) {
        event.preventDefault();
        console.log("Dropdown item clicked:", $(this).text());
        $('#model-dropdown-button').text($(this).text());
        getYears()
});

$('#year-dropdown').on('click', '.dropdown-item', function(event) {
        event.preventDefault();
        console.log("Dropdown item clicked:", $(this).text());
        $('#year-dropdown-button').text($(this).text());
});



