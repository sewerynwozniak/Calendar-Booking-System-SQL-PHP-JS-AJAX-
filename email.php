<?php

    
    $email = htmlspecialchars($_POST['email']);
    $fdate = htmlspecialchars($_POST['fdate']);
    

    $mailTo = $email;
    $subject = "Calendar Booking Confirmation";
    $txt = "Confirmed booking on ".$fdate;


    mail($mailTo, $subject, $txt);



?>