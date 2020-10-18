//circle start
let progressBar = document.querySelector('.e-c-progress');
let indicator = document.getElementById('e-indicator');
let pointer = document.getElementById('e-pointer');
let length = Math.PI * 2 * 100;

progressBar.style.strokeDasharray = length;

function update(value, timePercent) {
  var offset = - length - length * value / (timePercent);
  progressBar.style.strokeDashoffset = offset; 
  pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`; 
  console.log("here");
};

//circle ends
const displayOutput = document.querySelector('.display-remain-time')
const pauseBtn = document.getElementById('pause');
const setterBtns = document.querySelectorAll('button[data-setter]');
const NextBtn = document.getElementById('next');

let intervalTimer;
let timeLeft;
let wholeTime = 0.5 * 60; // manage this to set the whole time 
let isPaused = false;
let isStarted = false;
let lvls = [50, 40, 30, 20];


function changeWholeTime(seconds){
  if ((wholeTime + seconds) > 0){
    wholeTime += seconds;
    update(wholeTime,wholeTime);
    console.log("here2");
  }
}

function timer (seconds){ //counts time, takes seconds
  let remainTime = Date.now() + (seconds * 1000);
  displayTimeLeft(seconds);
  
  intervalTimer = setInterval(function(){
    timeLeft = Math.round((remainTime - Date.now()) / 1000);
    if(timeLeft < 0){
      clearInterval(intervalTimer);
      isStarted = false;
      displayTimeLeft(wholeTime);
      pauseBtn.classList.remove('pause');
      pauseBtn.classList.add('play');
      return ;
    }
    displayTimeLeft(timeLeft);
  }, 1000);
  console.log("here3");
}
console.log("here4");


function pauseTimer(event){
  if(isStarted === false){
    timer(wholeTime);
    isStarted = true;
    this.classList.remove('play');
    this.classList.add('pause');
    
    setterBtns.forEach(function(btn){
      btn.disabled = true;
      btn.style.opacity = 0.5;
    });

  }else if(isPaused){
    this.classList.remove('play');
    this.classList.add('pause');
    timer(timeLeft);
    isPaused = isPaused ? false : true
  }else{
    this.classList.remove('pause');
    this.classList.add('play');
    clearInterval(intervalTimer);
    isPaused = isPaused ? false : true ;
  }

}

function displayTimeLeft (timeLeft){ //displays time on the input
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  displayOutput.textContent = displayString;
  update(timeLeft, wholeTime);
}
let counter = 1;

function nextlvl(event){
  if ( counter < lvls.length){
    wholeTime = lvls[counter];
    displayTimeLeft(wholeTime); 
    counter++;
  }

  console.log("nextlvl");
}


update(wholeTime,wholeTime); //refreshes progress bar
//console.log("here3");
displayTimeLeft(wholeTime); 
//console.log("here4");
pauseBtn.addEventListener('click',pauseTimer);
NextBtn.addEventListener('click', nextlvl);