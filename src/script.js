let today = new Date();
let year = 1900 + today.getYear();
let monthStr = '';
let currMonthJs = today.getMonth();
let monthJs = today.getMonth();
let currentDay = today.getDate();

const calendarMonthAndYear = document.querySelector('.calendar__monthAndYear');
const tbody = document.querySelector('tbody');
const prevWrapper = document.querySelector('.calendar__prevWrapper');
const prev = document.querySelector('.calendar__prev');
const nextWrapper = document.querySelector('.calendar__nextWrapper');
const next = document.querySelector('.calendar__next');

const form__noEmpty = document.querySelectorAll('.form__noEmpty');
const form__botChecker = document.querySelector('.form__botChecker');
const form__textarea = document.querySelector('.form__textarea');
const form__email = document.querySelector('.form__email');
const form__date = document.querySelector('.form__date');
const form__close = document.querySelector('.form__close ');
const form__charHandler = document.querySelectorAll('.form__charHandler');

const alert = document.querySelector('.alert');
let counting =false 
let dateNumber = 1;
const modal = document.querySelector('.bookingModal');
let dayJsArray;
let monthTwoDigit;
let tds;
let selectedDay;



//email regex
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//dangerous character regex
const dangerousCharsRegex = /[<>/;:'"`#$%&]/;



// to compare dates function changes months from format 1 to 01 and to string
function changeMonthtoTwoDigitFormat(mth){
mth++;
if(mth.toString().length==1){
    return `0${mth}`
}else{
    return mth.toString();
}
}


// check if all inputs are filled

function checkIfEmpty(){
    for(let i=0;i<form__noEmpty.length;i++){
        if(form__noEmpty[i].value == ''){
            return true;
        }
    }
    return false;
}


//alert

function alertFunction(text){

if(alert.textContent != ''){
return;
} 
else{
    alert.textContent = text;
    alert.style.animation = 'alertAnimation 3s ease-in-out';   
    setTimeout(e=>{
    alert.textContent = '';    
    alert.style.animation = '';  
    },3000);
}
}




$(document).ready(function(){



    $.ajax({
        url:'retrieve.php',
        method:'GET',
        success: handleAjaxData
        
    })

    $(".form__submit").click(function(e){
       e.preventDefault();

      

        if(checkIfEmpty()){
            return alertFunction('Fill all inputs');
        }


        if(!emailRegex.test(form__email.value)){
            return alertFunction('Incorrect email');
        }

        form__charHandler.forEach(e=>{
            if(e.value.match(dangerousCharsRegex) != null){
            return alertFunction('Delete special characters from input');
            }
        })

        if(form__botChecker.value != ''){
            return alertFunction('Delete text from last input')
        }else{

 
        
        let fdate =$('.form__date').val();
        let fname =$('.form__name').val();
        let email =$('.form__email').val();
        let mobile =$('.form__mobile').val();
        let address =$('.form__address').val();
        let message =$('.form__message').val();
  


// add class booked provisionally before refreshing or changing month function will do it
for(let i=0;i<tds.length;i++){
    if([...tds][i].textContent == selectedDay.toString()){
        [...tds][i].classList.add('booked');
    }
}


        $.ajax({
            url:'insert.php',
            method:'POST',
            data:{
                fdate:fdate,
                fname:fname,
                email:email,
                mobile:mobile,
                address:address,
                message:message
            },
            success:function(){

                modal.style.display='none';
                form__noEmpty.forEach(e=>e.value='');
                form__botChecker.value='Delete this text to book!';
                alertFunction('Booked successfully');
                

                $.ajax({
                    url:'email.php',
                    method:'POST',
                    data:{
                        fdate:fdate,
                        email:email,
                    },
                    success:function(){
             
                    }
                })




            }
        })
    }
    });
});




function handleAjaxData(response){
        let dbDatesArray = JSON.parse(response);
        let dayJsArray =[];
        
        
    //loop throught array and select dates with the same year and month and provide day

    for(let i=0;i<dbDatesArray.length;i++){

    let dbyear = dbDatesArray[i].slice(0,4)
    let dbmonth = dbDatesArray[i].slice(5,7)

   
       if(dbyear == year.toString() && dbmonth == changeMonthtoTwoDigitFormat(monthJs)){
      
            //select day
            let daysArray = dbDatesArray[i].slice(-2);
                       
            if(daysArray[0]=='0'){
                daysArray = parseInt(daysArray.slice(-1)) 
            }else{
                daysArray = parseInt(daysArray)
            }
            
            dayJsArray.push(daysArray)

            
       }
       
    }

  

    createCalendar(dayJsArray)
}




form__close.addEventListener('click',()=>{
    modal.style.display='none';
})



function showModal(year, month, day){
    modal.style.display='flex';
    
    selectedDay = day;
    month+=1;

    if(month.toString().length==1){
        month='0'+month
    }
    if(day.toString().length==1){
        day='0'+day
    }
    form__date.value=`${year}-${month}-${day}`;
}


function translateSunMon(nr){
nr--;
if(nr<0) nr=6
return nr
}



function displayMonth(){

// prevent from moving to months from the past    
if(currMonthJs==monthJs){
    prevWrapper.style.cursor='not-allowed';
    prev.style.pointerEvents='none';
}else{
    prevWrapper.style.cursor='pointer';
    prev.style.pointerEvents='auto';
}

//prevent from moving more than 6 months onwards
if(Math.abs(currMonthJs-monthJs)==6){
    nextWrapper.style.cursor='not-allowed';
    next.style.pointerEvents='none';
}else{
    nextWrapper.style.cursor='pointer';
    next.style.pointerEvents='auto';
}



    switch(monthJs){
        case 0: monthStr ='January';
        break;
        case 1: monthStr ='February';
        break;
        case 2: monthStr ='March';
        break;
        case 3: monthStr ='April';
        break;
        case 4: monthStr ='May';
        break;
        case 5: monthStr ='June';
        break;
        case 6: monthStr ='July';
        break;
        case 7: monthStr ='August';
        break;
        case 8: monthStr ='September';
        break;
        case 9: monthStr ='October';
        break;
        case 10: monthStr ='November';
        break;
        case 11: monthStr ='December';
        break;
    }

    calendarMonthAndYear.textContent=monthStr + ' ' +year
}


function numberOfDaysFunction(){
    return new Date(year, monthJs+1,0).getDate();
}

let numberOfDays = numberOfDaysFunction()

let firstDayOfTheMonth = new Date(year+"-"+changeMonthtoTwoDigitFormat(monthJs)).getDay();

let transformedFirstDayOfTheMonth = translateSunMon(firstDayOfTheMonth);




//Create tr/td and insert days
function createCalendar(dayJsArray){
    
   

    for(let i=0;i<6;i++){

        
        //prevent from making last row empty
        
        if(dateNumber>=numberOfDays)return;

        let tr = document.createElement('tr');
        tbody.appendChild(tr)
        
        for(let j=0;j<7;j++){
            
           
        let td = document.createElement('td');
        // default td has set pointer events to: none
        td.classList.add('defaultTd');
        
        if(i==0 && j==transformedFirstDayOfTheMonth){
        counting=true
        }
        
        if(counting && dateNumber<=numberOfDays){

            
            td.textContent = dateNumber;
            //remove pointer events: none 
            td.classList.remove('defaultTd');
            td.addEventListener('click',showModal.bind(this, year, monthJs, dateNumber))
     
            //check if day is booked

            if(dayJsArray.includes(dateNumber)){
            td.classList.add('booked');
            }
            //check if day is the past
            if(currMonthJs==monthJs && dateNumber<currentDay){
                td.classList.add('past');
            }
            //check if day is today
            if(currMonthJs==monthJs && dateNumber==currentDay){
                td.classList.add('today');
            }
            //check if day is sunday
            if(j==6){
            td.classList.add('sunday');
            }
            dateNumber++
        }
        tr.appendChild(td)
        }
        tds = document.querySelectorAll('td');
        }
        
}




prev.addEventListener('click', prevMonth)
next.addEventListener('click', nextMonth)



function prevMonth(){    

    $.ajax({
        
        url:'retrieve.php',
        method:'GET',
        success: handleAjaxData
        
    })

counting =false; 
dateNumber = 1;
monthJs -=1;
if(monthJs<0){
    year -=1;
    monthJs = 11;
} 
firstDayOfTheMonth = new Date(year+"-"+changeMonthtoTwoDigitFormat(monthJs)).getDay();
transformedFirstDayOfTheMonth = translateSunMon(firstDayOfTheMonth);
tbody.innerHTML='';
numberOfDays = numberOfDaysFunction()
displayMonth()
};



function nextMonth(){    

    $.ajax({
        
        url:'retrieve.php',
        method:'GET',
        success: handleAjaxData
        
    })

counting =false; 
dateNumber = 1;
monthJs +=1;
if(monthJs>11){
    year +=1;
    monthJs = 0
} 

firstDayOfTheMonth = new Date(year+"-"+changeMonthtoTwoDigitFormat(monthJs)).getDay();
transformedFirstDayOfTheMonth = translateSunMon(firstDayOfTheMonth);
tbody.innerHTML='';
numberOfDays = numberOfDaysFunction()
displayMonth()
};





//Fire function
displayMonth()

