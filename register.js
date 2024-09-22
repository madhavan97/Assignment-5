let bookClassBtn = document.querySelector("button[type='submit']");

bookClassBtn.addEventListener("click", async(e) => {
    e.preventDefault();

    let classType = document.querySelector("#class").value;
    let date = document.querySelector("#date").value;
    let slot = document.querySelector("#slot-select").value;
    let trainer = document.querySelector("#trainer-select").value;

    if (classType === "" || date === "" || slot === "" || trainer === "") {
        return alert("Please fill all the details!");
    }

    let bookingObj = {
        class: classType,
        date,
        slot,
        trainer
    };

    await bookClass(bookingObj);
});

async function bookClass(obj) {
    try {
        let res = await fetch('book_class_process.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        let out = await res.json();

        if (out.msg === "Booking Successful") {
            alert("Class booked successfully!");
            window.location.href = "./index.html"; // Redirect after successful booking
        } else {
            alert("Something went wrong!");
        }
    } catch (error) {
        console.log("Error", error);
        alert("Something went wrong!");
    }
}