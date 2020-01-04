let allQuestions = {
    OneA : ['2*2'],
    OneB : ['3*2', '3*3', '3*4'],
    TwoA : ['4*2']
}
  
let allAnswers = {
    OneA : [4],
    OneB : [6, 9, 12],
    TwoA : [8]
}

let wrongGuesses = {}

let questionSetName = 0;
let questionIndex = 0;
let question = 0;

function checkEndQuiz(obj) {
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
  
function selectQuestion(obj) {
    let questionSetArray = Object.keys(obj);
    questionSetName = questionSetArray[Math.floor(Math.random() * questionSetArray.length)];
    let questionArray = allQuestions[questionSetName];
    questionIndex = Math.floor(Math.random() * questionArray.length); 
    return question = allQuestions[questionSetName][questionIndex];
}
  
function deleteQuestion(obj) {
    allQuestions[questionSetName].splice(questionIndex, 1);
    allAnswers[questionSetName].splice(questionIndex, 1);
    if (allQuestions[questionSetName].length < 1) {
      delete allQuestions[questionSetName];
      delete allAnswers[questionSetName];
    }
}

selectQuestion(allQuestions);
console.log(allQuestions[questionSetName][questionIndex]);
  
deleteQuestion(allQuestions);
  
  console.log(allQuestions);
  console.log(allAnswers);