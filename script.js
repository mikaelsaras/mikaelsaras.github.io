let allQuestions = {
OneA : ['2 * 7', '2 * 5', '2 * 8', '9 * 2', '6 * 2', '4 * 2'],
OneB : ['4 * 5', '4 * 8', '4 * 4', '7 * 4', '9 * 4', '4 * 6'],
TwoA : ['3 * 5', '3 * 7', '3 * 4', '8 * 3', '6 * 3', '9 * 3'],
TwoB : ['6 * 5', '6 * 9', '6 * 4', '7 * 6', '6 * 6', '8 * 6'],
ThreeA : ['5 * 4', '5 * 9', '5 * 3', '7 * 5', '8 * 5', '5 * 5'],
ThreeB : ['7 * 8', '9 * 9', '8 * 8', '8 * 9', '7 * 7', '9 * 7']
};

let allAnswers = {
OneA : [14, 10, 16, 18, 12, 8],
OneB : [20, 32, 16, 28, 36, 24],
TwoA : [15, 21, 12, 24, 18, 27],
TwoB : [30, 54, 24, 42, 36, 48],
ThreeA : [20, 45, 15, 35, 40, 25],
ThreeB : [56, 81, 64, 72, 49, 63]
};

let wrongGuesses = {};

let questionSetName = 0;
let questionIndex = 0;
let question = 0;
let answer = 0;
let guess = 0;
let input = document.querySelector('.guessField');
let startTime = Date.now();
/*
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectQuestionAndAnswer() {
    if (availableQuestions.length == 0) {
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
    selector = getRandomNumber(0, (availableQuestions.length - 1));
    question = availableQuestions[selector];
    answer = availableAnswers[selector];
    }
}
*/

function checkEndQuiz() {
    if (Object.keys(allQuestions).length == 0) {
        if (Object.keys(wrongGuesses).length == 0) {
            let endTime = Date.now();
            let timeUsed = msToMinutes(endTime - startTime);
            document.querySelector('.guessCorrectionMessage').innerHTML = 
            'Färdig med diagnos! Du fick alla rätt, bra jobbat! Tid: ' + timeUsed; 
        } else {     
            let endTime = Date.now();
            let timeUsed = msToMinutes(endTime - startTime);       
            document.querySelector('.guessCorrectionMessage').innerHTML = 
            'Färdig med diagnos! Du fick ' + Object.keys(wrongGuesses).length + ' fel. Tid: ' + timeUsed;
        }
    }
}

/*
function removeUsedQuestionsAndAnswers() {
    availableQuestions.splice(selector, 1);
    availableAnswers.splice(selector, 1);
}
*/

function selectQuestion(obj) {
    let questionSetArray = Object.keys(obj);
    questionSetName = questionSetArray[Math.floor(Math.random() * questionSetArray.length)];
    let questionArray = allQuestions[questionSetName];
    questionIndex = Math.floor(Math.random() * questionArray.length); 
    question = allQuestions[questionSetName][questionIndex];
    return answer = allAnswers[questionSetName][questionIndex];
}

function deleteQuestion() {
    allQuestions[questionSetName].splice(questionIndex, 1);
    allAnswers[questionSetName].splice(questionIndex, 1);
    if (allQuestions[questionSetName].length < 1) {
      delete allQuestions[questionSetName];
      delete allAnswers[questionSetName];
    }
}

function displayQuestion(){
    document.querySelector('.questionField').innerHTML = question + ' = ';
    document.querySelector('.guessField').focus();
    document.querySelector('.guessField').value ='';
}

function checkGuess() {
    guess = Number(document.querySelector('.guessField').value);
    if (guess !== answer) {
        wrongGuesses[questionSetName].push(question);
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
    selectQuestion(allQuestions);
    deleteQuestion();
    displayQuestion();
}

function continueQuiz() {
    checkEndQuiz();
    checkGuess();
    selectQuestion(allQuestions);
    deleteQuestion();
    displayQuestion();
}

startQuiz();
