$(document).ready(function() {
    // Handle form submission
    $('form').on('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        // Gather form data
        let classType = $('#class').val();
        let date = $('#date').val();
        let slot = $('#slot-select').val();
        let trainer = $('#trainer-select').val();

        // Validate form data
        if (!classType || !date || !slot || !trainer) {
            alert("Please fill in all fields!");
            return;
        }

        // Prepare data object
        let bookingData = {
            class: classType,
            date: date,
            slot: slot,
            trainer: trainer
        };

        // Send AJAX request
        $.ajax({
            url: 'book_class_process.php', // Endpoint to send the data
            type: 'POST',
            data: bookingData,
            success: function(response) {
                // Handle success response
                alert("Class booked successfully!");
                // Optionally, reset the form or redirect
                $('form')[0].reset(); // Reset the form
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Handle error response
                alert("Error booking the class: " + errorThrown);
            }
        });
    });
});