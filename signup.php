<?php
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

$conn = new mysqli('localhost','root','','fairshare');
if($conn->connect_error){
    die('connection failed : '.$conn->connect_error);
}
else{
    $stmt = $conn->prepare("insert into users(name, email, password) values(? , ? , ?)");
    $stmt->bind_param("sss",$name,$email,$password);
    $stmt->execute();
    header("Location: grup.html");
    exit();
    $stmt->close();
    $conn->close();
}
?>