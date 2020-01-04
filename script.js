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
let gameIsDone = false;

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function countWrongAnswers(obj) {
    let numberOfWrongAnswers = 0;
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            numberOfWrongAnswers += obj[key].length;
        }
    }
    return numberOfWrongAnswers;
}


function checkEndQuiz(_allQuestions, _wrongGuesses) {
    let textResponse = "";
    const numberOfWrongAnswers = countWrongAnswers(_wrongGuesses);
    if (isEmpty(_allQuestions)) {
        gameIsDone = true;
        if (numberOfWrongAnswers == 0) {
            textResponse = 'Färdig med diagnos! Du fick alla rätt, bra jobbat! Tid: '; 
        } else {
            textResponse = 'Färdig med diagnos! Du fick ' + numberOfWrongAnswers + ' fel. Tid: ';
        }
        let timeUsed = msToMinutes(Date.now() - startTime);
        document.querySelector('.guessCorrectionMessage').innerHTML = textResponse + timeUsed;
    }   
}

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
        setWrongAnswer(questionSetName, question);
        document.querySelector('.guessCorrectionMessage').innerHTML = 'fel!';
    } else {
        document.querySelector('.guessCorrectionMessage').innerHTML = 'rätt!';   
    }
}
function setWrongAnswer (tableName, question) {
    if (wrongGuesses.hasOwnProperty(tableName)) {
        wrongGuesses[tableName].push(question);
    } else {
//spread operator
        wrongGuesses = {...wrongGuesses, [tableName] : [question]}
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
    displayQuestion();
}

function continueQuiz() {
    checkGuess();
    deleteQuestion();
    checkEndQuiz(allQuestions, wrongGuesses);
    if (!gameIsDone) {
        selectQuestion(allQuestions);
        displayQuestion();
        }
}

startQuiz();
