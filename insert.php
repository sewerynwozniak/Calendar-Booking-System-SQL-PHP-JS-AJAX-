<?php


$fdate = $_POST['fdate'];
$fname = $_POST['fname'];
$email = $_POST['email'];
$mobile = $_POST['mobile'];
$address = $_POST['address'];
$message = $_POST['message'];



$conn = mysqli_connect("localhost", "root", "", "appointment");


if ($conn) {
  $conn->set_charset("utf8");

    $q = "insert into booking(fulldata, name, email, mobile, address, message) values('$fdate', '$fname', '$email', '$mobile', '$address', '$message')";

if(mysqli_query($conn, $q)){
 
}
    
  }else{
      echo 'Connection fail';
  }
  $conn->close();
?>


