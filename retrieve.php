<?php

$conn = mysqli_connect("localhost", "root", "", "appointment");

if ($conn) {
    
    $array = array();

    $q = "SELECT * FROM booking WHERE fulldata >= CURRENT_DATE()";

    $result = mysqli_query($conn, $q);
    while($row= mysqli_fetch_array($result)){
    $array[]= $row[1];

    }
    echo json_encode($array);
   
}
else{
      
  }

$conn->close();
?>
