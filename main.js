const number = document.querySelectorAll('.number');
const answer = document.querySelector('.answer input');
const submitBtn = document.querySelector('.answer button');
const questionText = document.querySelectorAll('.question span');
const questionNum = document.querySelector('.question code');
const timeBar = document.querySelector('.time p');
const result = document.querySelector('.score code');
const finalPage = document.querySelector('.final');
const finalResult = document.querySelector('.final code');
const restartBtn = document.querySelector('.final button');
const cheer = document.querySelector('.cheer');

let interval,num1,num2,timebarMove;
let score=0,count=0;

let clear = function(){
  clearInterval(interval);
  count = 0;
}       
let gameStart = function(){
  clear();
  questionText.forEach(function(text){
    text.classList.remove('waiting');
  });
  score = 0;
  result.textContent = score;
  number[0].textContent = Math.ceil(Math.random()*8) + 1;
  number[1].textContent = Math.ceil(Math.random()*9);
  num1 = number[0].textContent;
  num2 = number[1].textContent;
  count = 1;
  questionNum.textContent = count;
  timebarMove = timeBar.animate([
    {transform: 'scaleX(100%)'},
    {transform: 'scaleX(0)'}
  ],3000);
  
  interval = setInterval(function(){
    number[0].textContent = Math.ceil(Math.random()*8) + 1;
    number[1].textContent = Math.ceil(Math.random()*9);
    num1 = number[0].textContent;
    num2 = number[1].textContent;
    count++;
    timebarMove = timeBar.animate([
      {transform: 'scaleX(100%)'},
      {transform: 'scaleX(0)'}
    ],3000);
    if(count===10){
      clear();
      count = 10;
      questionNum.textContent = count;
      setTimeout(function(){
        finalPage.classList.add('active');
        timebarMove.pause();
        if(score>70){
          cheer.textContent = '축하합니다!'
        }else{
          cheer.textContent = '아쉽습니다!'
        }
      },3000);
    }
    questionNum.textContent = count;                   
  },3000);         
}

btnStart.onclick = gameStart;
btnStop.onclick = function(){
  clear();
  timebarMove.pause();
}

function checkAnswer() {
  if(answer.value == Number(num1)*Number(num2)){
    score += 10;
  }else{
    alert('틀렸습니다ㅠㅠ')
  }
  result.textContent = score;
  finalResult.textContent = score;
  answer.value = '';
}

submitBtn.onclick = function(){
  checkAnswer();
}
window.addEventListener('keypress', function(e) {
  if(e.keyCode == 13){
    checkAnswer();
  }
})

restartBtn.onclick = function(){
  count = 0;
  result.textContent = '00';
  score = 0;
  questionNum.textContent = count;
  questionText.forEach(function(text){
    text.classList.add('waiting');
  });
  finalPage.classList.remove('active');
  number[0].textContent = '?';
  number[1].textContent = '?';
}