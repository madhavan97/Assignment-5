let loginBtn = document.querySelector("button[type='submit']");

// Add an event listener for the login button click event
loginBtn.addEventListener("click", async(e) => {
    e.preventDefault(); // Prevent default form submission behavior

    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    // Basic validation to check if fields are filled
    if (email === "" || password === "") {
        return alert("Please fill all the details!");
    }

    // Create the object to be sent in the POST request
    let obj = {
        email,
        password
    };

    // Call the async loginUser function to process login
    await loginUser(obj);
});

// Function to handle login request
async function loginUser(obj) {
    try {
        // Send a POST request to the login endpoint
        let res = await fetch(`${baseUrl}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj) // Send login data as JSON
        });

        let out = await res.json(); // Parse the JSON response

        // Handle different response messages
        if (out.msg === "Wrong Credentials") {
            alert("Wrong Credentials. Please try again.");
        } else if (out.msg === "Login Successfully") {
            // Save token and name in session storage
            sessionStorage.setItem("token", out.token);
            sessionStorage.setItem("name", out.name);
            alert("You logged in successfully!");

            // Redirect to home page after successful login
            window.location.href = "./index.html";
        } else if (out.msg === "User not registered") {
            alert("Please register before logging in.");
        } else {
            alert("Something went wrong!");
        }
    } catch (error) {
        console.log("Error", error); // Log any error in the console
        alert("Something went wrong during the login process. Please try again.");
    }
}