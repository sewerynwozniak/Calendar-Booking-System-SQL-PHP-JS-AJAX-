<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendar</title>
    <link rel="stylesheet" href="./css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>

<div class="alert"></div>


<div class="bookingModal">
<form class="form">
    <h1 class="form__h1">Book a date</h1>
    <input class="form__input form__date" type="text" name="fdate" readonly>
    <input class="form__input form__noEmpty form__name form__charHandler" type="text" name="fname" placeholder="name">
    <input class="form__input form__noEmpty form__email form__charHandler" type="text" name="email" placeholder="email">
    <input class="form__input form__noEmpty form__mobile form__charHandler" type="text" name="mobile" placeholder="mobile number">
    <input class="form__input form__noEmpty form__address form__charHandler" type="text" name="address" placeholder="address">
    <textarea class="form__textarea form__noEmpty form__charHandler" cols="30" rows="10" name="message" placeholder="describe repair"></textarea>
    <input class="form__input form__botChecker" type="text" name="botChecker" value='Delete this text to book!'>
    <button class="form__submit">Book</button>
    <div class="form__close">X</div>
</form>
</div>    


<h1 class='header__h1'>Calendar Booking System</h1>



<div class="calendar__container">
    <div class="calendar__header">
        <div class="calendar__prevWrapper"><p class="calendar__prev"><</p></div>
        <div class="calendar__monthAndYear"></div>
        <div class="calendar__nextWrapper"><p class="calendar__next">></p></div>
    </div>
    <table>
        <thead>
            <tr>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>

<div class="description">
    <h1 class='description__h1'>Description</h1>
    <div class="description__divWrapper">
        <div class="description__div description__available"></div>
        <div class="description__div description__booked"></div>
        <div class="description__div description__past"></div>
        <div class="description__div description__sunday"></div>
    </div>
</div>


</body>


<script src="./dist/script.js"></script>



</html>