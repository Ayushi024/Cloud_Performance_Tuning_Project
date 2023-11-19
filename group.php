<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fairshare";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $selectedGroup = $_POST['group'];
    $newGroup = $_POST['newGroup'];

    if (!empty($newGroup)) {
      
        $stmt = $conn->prepare("INSERT INTO groups (group_name) VALUES (?)");
        $stmt->bind_param("s", $newGroup);
        $stmt->execute();
        $stmt->close();
        header("Location: members.html");
        exit();
    } elseif (!empty($selectedGroup)) {
        header("Location: members.html");
        
    }
}


$existingGroups = [];
$result = $conn->query("SELECT group_name FROM groups");

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $existingGroups[] = $row['group_name'];
    }
}

$conn->close();
?>