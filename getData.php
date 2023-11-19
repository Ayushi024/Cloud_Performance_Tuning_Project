<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fairshare";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch existing groups from the database
$existingGroups = [];
$result = $conn->query("SELECT group_name FROM groups");

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $existingGroups[] = $row['group_name'];
    }
}

$conn->close();

// Encode the PHP array to JSON and echo directly
echo json_encode($existingGroups, JSON_HEX_QUOT | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS);
?>
