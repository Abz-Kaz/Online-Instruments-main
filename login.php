<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

// Database connection
$servername = "FMS";
$username = "root";
$password = "Aliya.s@123";
$dbname = "rhythm_realm_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Database connected successfully";
// Get form data
$email = $_POST['email'];
$password = $_POST['password'];

// Check if user exists
$sql = "SELECT id, email, password FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {
        // Password is correct, start a session
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['email'] = $row['email'];
        
        // Redirect to main page
        header("Location: ICT PROJ INSTRUMENTS.html");
    } else {
        // Password is incorrect
        echo "Invalid password";
        header("Location: index.html?error=invalid_password");
    }
} else {
    // User doesn't exist
    echo "User not found";
    header("Location: index.html?error=user_not_found");
}

$stmt->close();
$conn->close();
?>