<?php
session_start();
include('db.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare SQL statement
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if user exists
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['logged_in'] = true; // You can track login status
            
            // Send success response
            echo json_encode([
                "status" => "success",
                "message" => "Login successful. Redirecting...",
                "redirect" => "dashboard.php"
            ]);
        } else {
            // Send error response if password is wrong
            echo json_encode([
                "status" => "error",
                "message" => "Wrong Credentials"
            ]);
        }
    } else {
        // Send error response if user is not found
        echo json_encode([
            "status" => "error",
            "message" => "User not registered"
        ]);
    }

    $stmt->close();
}
$conn->close();
?>
