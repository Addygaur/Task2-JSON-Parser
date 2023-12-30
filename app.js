function displayTable(data, displayFields) {
    var tableContent = buildTableContent(data, displayFields);

    // Open a new window and write the table content
    var newWindow = window.open();
    newWindow.document.write('<html><head><title>JSON Parser Result</title><link rel="stylesheet" type="text/css" href="style.css"></head><body>');
    newWindow.document.write('<h2>JSON Parser Result</h2>');
    newWindow.document.write(tableContent);
    newWindow.document.write('</body></html>');
}

function buildTableContent(data, displayFields) {
    var tableContent = '<table id="resultTable">';
    tableContent += '<thead><tr>';
    displayFields.forEach(field => {
        // Capitalize the first letter of each field
        var capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
        tableContent += '<th>' + capitalizedField + '</th>';
    });
    tableContent += '</tr></thead>';

    var products = data.products;
    var sortedProducts = Object.keys(products).sort((a, b) => {
        return products[b].popularity - products[a].popularity;
    });

    tableContent += '<tbody>';
    sortedProducts.forEach(productId => {
        var product = products[productId];
        tableContent += '<tr>';
        displayFields.forEach(field => {
            // Capitalize the first letter of each field
            var capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
            tableContent += '<td data-label="' + capitalizedField + '">' + (product[field] || '-') + '</td>';
        });
        tableContent += '</tr>';
    });
    tableContent += '</tbody></table>';

    return tableContent;
}


function parseJSON() {
    var fileInput = document.getElementById('file');
    var fileType = document.getElementById('fileType').value;
    var encoding = document.getElementById('encoding').value;
    var delimiter = document.getElementById('delimiter').value;
    var hasHeader = document.getElementById('hasHeader').checked;
    var displayFields = getSelectedOptions('displayFields');

    if (!fileInput.files.length) {
        alert('Please select a file.');
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var data;
        if (fileType === 'json') {
            data = JSON.parse(e.target.result);
        } else {
            // Handle CSV parsing logic here if needed
        }

        displayTable(data, displayFields);
    };

    reader.readAsText(file, encoding);
}

function getSelectedOptions(selectId) {
    var select = document.getElementById(selectId);
    return Array.from(select.options).map(option => option.value);
}

function cancel() {
    // Implement cancel logic here
    console.log('Cancel clicked');
}

document.getElementById('addField').addEventListener('click', function() {
    moveSelectedOptions('availableFields', 'displayFields');
});

document.getElementById('removeField').addEventListener('click', function() {
    moveSelectedOptions('displayFields', 'availableFields');
});

function moveSelectedOptions(sourceId, destinationId) {
    var sourceSelect = document.getElementById(sourceId);
    var destinationSelect = document.getElementById(destinationId);

    for (var i = 0; i < sourceSelect.options.length; i++) {
        var option = sourceSelect.options[i];
        if (option.selected) {
            destinationSelect.appendChild(option);
            i--; // Adjust index after removal
        }
    }
}
