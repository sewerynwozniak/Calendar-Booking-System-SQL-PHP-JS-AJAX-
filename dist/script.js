"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var today = new Date();
var year = 1900 + today.getYear();
var monthStr = '';
var currMonthJs = today.getMonth();
var monthJs = today.getMonth();
var currentDay = today.getDate();
var calendarMonthAndYear = document.querySelector('.calendar__monthAndYear');
var tbody = document.querySelector('tbody');
var prevWrapper = document.querySelector('.calendar__prevWrapper');
var prev = document.querySelector('.calendar__prev');
var nextWrapper = document.querySelector('.calendar__nextWrapper');
var next = document.querySelector('.calendar__next');
var form__noEmpty = document.querySelectorAll('.form__noEmpty');
var form__botChecker = document.querySelector('.form__botChecker');
var form__textarea = document.querySelector('.form__textarea');
var form__email = document.querySelector('.form__email');
var form__date = document.querySelector('.form__date');
var form__close = document.querySelector('.form__close ');
var form__charHandler = document.querySelectorAll('.form__charHandler');
var alert = document.querySelector('.alert');
var counting = false;
var dateNumber = 1;
var modal = document.querySelector('.bookingModal');
var dayJsArray;
var monthTwoDigit;
var tds;
var selectedDay; //email regex

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //dangerous character regex

var dangerousCharsRegex = /[<>/;:'"`#$%&]/; // to compare dates function changes months from format 1 to 01 and to string

function changeMonthtoTwoDigitFormat(mth) {
  mth++;

  if (mth.toString().length == 1) {
    return "0".concat(mth);
  } else {
    return mth.toString();
  }
} // check if all inputs are filled


function checkIfEmpty() {
  for (var i = 0; i < form__noEmpty.length; i++) {
    if (form__noEmpty[i].value == '') {
      return true;
    }
  }

  return false;
} //alert


function alertFunction(text) {
  if (alert.textContent != '') {
    return;
  } else {
    alert.textContent = text;
    alert.style.animation = 'alertAnimation 3s ease-in-out';
    setTimeout(function (e) {
      alert.textContent = '';
      alert.style.animation = '';
    }, 3000);
  }
}

$(document).ready(function () {
  $.ajax({
    url: 'retrieve.php',
    method: 'GET',
    success: handleAjaxData
  });
  $(".form__submit").click(function (e) {
    e.preventDefault();

    if (checkIfEmpty()) {
      return alertFunction('Fill all inputs');
    }

    if (!emailRegex.test(form__email.value)) {
      return alertFunction('Incorrect email');
    }

    form__charHandler.forEach(function (e) {
      if (e.value.match(dangerousCharsRegex) != null) {
        return alertFunction('Delete special characters from input');
      }
    });

    if (form__botChecker.value != '') {
      return alertFunction('Delete text from last input');
    } else {
      var fdate = $('.form__date').val();
      var fname = $('.form__name').val();
      var email = $('.form__email').val();
      var mobile = $('.form__mobile').val();
      var address = $('.form__address').val();
      var message = $('.form__message').val(); // add class booked provisionally before refreshing or changing month function will do it

      for (var i = 0; i < tds.length; i++) {
        if (_toConsumableArray(tds)[i].textContent == selectedDay.toString()) {
          _toConsumableArray(tds)[i].classList.add('booked');
        }
      }

      $.ajax({
        url: 'insert.php',
        method: 'POST',
        data: {
          fdate: fdate,
          fname: fname,
          email: email,
          mobile: mobile,
          address: address,
          message: message
        },
        success: function success() {
          modal.style.display = 'none';
          form__noEmpty.forEach(function (e) {
            return e.value = '';
          });
          form__botChecker.value = 'Delete this text to book!';
          alertFunction('Booked successfully');
          $.ajax({
            url: 'email.php',
            method: 'POST',
            data: {
              fdate: fdate,
              email: email
            },
            success: function success() {}
          });
        }
      });
    }
  });
});

function handleAjaxData(response) {
  var dbDatesArray = JSON.parse(response);
  var dayJsArray = []; //loop throught array and select dates with the same year and month and provide day

  for (var i = 0; i < dbDatesArray.length; i++) {
    var dbyear = dbDatesArray[i].slice(0, 4);
    var dbmonth = dbDatesArray[i].slice(5, 7);

    if (dbyear == year.toString() && dbmonth == changeMonthtoTwoDigitFormat(monthJs)) {
      //select day
      var daysArray = dbDatesArray[i].slice(-2);

      if (daysArray[0] == '0') {
        daysArray = parseInt(daysArray.slice(-1));
      } else {
        daysArray = parseInt(daysArray);
      }

      dayJsArray.push(daysArray);
    }
  }

  createCalendar(dayJsArray);
}

form__close.addEventListener('click', function () {
  modal.style.display = 'none';
});

function showModal(year, month, day) {
  modal.style.display = 'flex';
  selectedDay = day;
  month += 1;

  if (month.toString().length == 1) {
    month = '0' + month;
  }

  if (day.toString().length == 1) {
    day = '0' + day;
  }

  form__date.value = "".concat(year, "-").concat(month, "-").concat(day);
}

function translateSunMon(nr) {
  nr--;
  if (nr < 0) nr = 6;
  return nr;
}

function displayMonth() {
  // prevent from moving to months from the past    
  if (currMonthJs == monthJs) {
    prevWrapper.style.cursor = 'not-allowed';
    prev.style.pointerEvents = 'none';
  } else {
    prevWrapper.style.cursor = 'pointer';
    prev.style.pointerEvents = 'auto';
  } //prevent from moving more than 6 months onwards


  if (Math.abs(currMonthJs - monthJs) == 6) {
    nextWrapper.style.cursor = 'not-allowed';
    next.style.pointerEvents = 'none';
  } else {
    nextWrapper.style.cursor = 'pointer';
    next.style.pointerEvents = 'auto';
  }

  switch (monthJs) {
    case 0:
      monthStr = 'January';
      break;

    case 1:
      monthStr = 'February';
      break;

    case 2:
      monthStr = 'March';
      break;

    case 3:
      monthStr = 'April';
      break;

    case 4:
      monthStr = 'May';
      break;

    case 5:
      monthStr = 'June';
      break;

    case 6:
      monthStr = 'July';
      break;

    case 7:
      monthStr = 'August';
      break;

    case 8:
      monthStr = 'September';
      break;

    case 9:
      monthStr = 'October';
      break;

    case 10:
      monthStr = 'November';
      break;

    case 11:
      monthStr = 'December';
      break;
  }

  calendarMonthAndYear.textContent = monthStr + ' ' + year;
}

function numberOfDaysFunction() {
  return new Date(year, monthJs + 1, 0).getDate();
}

var numberOfDays = numberOfDaysFunction();
var firstDayOfTheMonth = new Date(year + "-" + changeMonthtoTwoDigitFormat(monthJs)).getDay();
var transformedFirstDayOfTheMonth = translateSunMon(firstDayOfTheMonth); //Create tr/td and insert days

function createCalendar(dayJsArray) {
  for (var i = 0; i < 6; i++) {
    //prevent from making last row empty
    if (dateNumber >= numberOfDays) return;
    var tr = document.createElement('tr');
    tbody.appendChild(tr);

    for (var j = 0; j < 7; j++) {
      var td = document.createElement('td'); // default td has set pointer events to: none

      td.classList.add('defaultTd');

      if (i == 0 && j == transformedFirstDayOfTheMonth) {
        counting = true;
      }

      if (counting && dateNumber <= numberOfDays) {
        td.textContent = dateNumber; //remove pointer events: none 

        td.classList.remove('defaultTd');
        td.addEventListener('click', showModal.bind(this, year, monthJs, dateNumber)); //check if day is booked

        if (dayJsArray.includes(dateNumber)) {
          td.classList.add('booked');
        } //check if day is the past


        if (currMonthJs == monthJs && dateNumber < currentDay) {
          td.classList.add('past');
        } //check if day is today


        if (currMonthJs == monthJs && dateNumber == currentDay) {
          td.classList.add('today');
        } //check if day is sunday


        if (j == 6) {
          td.classList.add('sunday');
        }

        dateNumber++;
      }

      tr.appendChild(td);
    }

    tds = document.querySelectorAll('td');
  }
}

prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);

function prevMonth() {
  $.ajax({
    url: 'retrieve.php',
    method: 'GET',
    success: handleAjaxData
  });
  counting = false;
  dateNumber = 1;
  monthJs -= 1;

  if (monthJs < 0) {
    year -= 1;
    monthJs = 11;
  }

  firstDayOfTheMonth = new Date(year + "-" + changeMonthtoTwoDigitFormat(monthJs)).getDay();
  transformedFirstDayOfTheMonth = translateSunMon(firstDayOfTheMonth);
  tbody.innerHTML = '';
  numberOfDays = numberOfDaysFunction();
  displayMonth();
}

;

function nextMonth() {
  $.ajax({
    url: 'retrieve.php',
    method: 'GET',
    success: handleAjaxData
  });
  counting = false;
  dateNumber = 1;
  monthJs += 1;

  if (monthJs > 11) {
    year += 1;
    monthJs = 0;
  }

  firstDayOfTheMonth = new Date(year + "-" + changeMonthtoTwoDigitFormat(monthJs)).getDay();
  transformedFirstDayOfTheMonth = translateSunMon(firstDayOfTheMonth);
  tbody.innerHTML = '';
  numberOfDays = numberOfDaysFunction();
  displayMonth();
}

; //Fire function

displayMonth();