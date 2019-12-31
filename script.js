let availableMultiplications = 
['2 * 7', '2 * 5', '2 * 8', '9 * 2', '6 * 2', '4 * 2',
 /*'4 * 5', '4 * 8', '4 * 4', '7 * 4', '9 * 4', '4 * 6',
 '3 * 5', '3 * 7', '3 * 4', '8 * 3', '6 * 3', '9 * 3',
 '6 * 5', '6 * 9', '6 * 4', '7 * 6', '6 * 6', '8 * 6',
 '5 * 4', '5 * 9', '5 * 3', '7 * 5', '8 * 5', '5 * 5',*/
 '7 * 8', '9 * 9', '8 * 8', '8 * 9', '7 * 7', '9 * 7'];

let availableProducts =
[14, 10, 16, 18, 12, 8,
 /*20, 32, 16, 28, 36, 24,
 15, 21, 12, 24, 18, 27,
 30, 54, 24, 42, 36, 48,
 20, 45, 15, 35, 40, 25,*/
 56, 81, 64, 72, 49, 63];

let selector = 0;
let question = 0;
let answer = 0;
let guess = 0;
let wrongGuesses = [];
let input = document.querySelector('.guessField');
let startTime = Date.now();

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectQuestionAndAnswer() {
    if (availableMultiplications.length == 0) {
        if (wrongGuesses.length == 0) {
            let endTime = Date.now();
            let timeUsed = msToMinutes(endTime - startTime);
            document.querySelector('.guessCorrectionMessage').innerHTML = 
            'Färdig med diagnos! Du fick alla rätt, bra jobbat! Tid: ' + timeUsed;  
        } else {     
            let endTime = Date.now();
            let timeUsed = msToMinutes(endTime - startTime);       
            document.querySelector('.guessCorrectionMessage').innerHTML = 
            'Färdig med diagnos! Du fick ' + wrongGuesses.length + ' fel. Tid: ' + timeUsed;
        }
    } else {
    selector = getRandomNumber(0, (availableMultiplications.length - 1));
    question = availableMultiplications[selector];
    answer = availableProducts[selector];
    }
}

function removeUsedQuestionsAndAnswers() {
    availableMultiplications.splice(selector, 1);
    availableProducts.splice(selector, 1);
}

function displayQuestion(){
    document.querySelector('.questionField').innerHTML = question + ' = ';
    document.querySelector('.guessField').focus();
    document.querySelector('.guessField').value ='';
}

function checkGuess() {
    guess = Number(document.querySelector('.guessField').value);
    if (guess !== answer) {
        wrongGuesses.push(question);
        document.querySelector('.guessCorrectionMessage').innerHTML = 'fel!';
    } else {
        document.querySelector('.guessCorrectionMessage').innerHTML = 'rätt!';   
    }
}

function msToMinutes(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}
input.addEventListener('keyup',function(e){
    if (e.keyCode === 13) {
    document.querySelector('.guessButton').click();
  }
});

function startQuiz() {
    selectQuestionAndAnswer();
    removeUsedQuestionsAndAnswers();
    displayQuestion();
}

function continueQuiz() {
    checkGuess();
    selectQuestionAndAnswer();
    removeUsedQuestionsAndAnswers();
    displayQuestion();
}

startQuiz();

