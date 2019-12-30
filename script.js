let availableMultiplications = 
['2 * 7', '2 * 5', '2 * 8', '9 * 2', '6 * 2', '4 * 2',
 '4 * 5', '4 * 8', '4 * 4', '7 * 4', '9 * 4', '4 * 6',
 '3 * 5', '3 * 7', '3 * 4', '8 * 3', '6 * 3', '9 * 3',
 '6 * 5', '6 * 9', '6 * 4', '7 * 6', '6 * 6', '8 * 6',
 '5 * 4', '5 * 9', '5 * 3', '7 * 5', '8 * 5', '5 * 5',
 '7 * 8', '9 * 9', '8 * 8', '8 * 9', '7 * 7', '9 * 7'];

let availableProducts =
[14, 10, 16, 18, 12, 8, 
 20, 32, 16, 28, 36, 24, 
 15, 21, 12, 24, 18, 27,
 30, 54, 24, 42, 36, 48,
 20, 45, 15, 35, 40, 25, 
 56, 81, 64, 72, 49, 63];

let selector = 0;
let question = 0;
let answer = 0;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectQuestionAndAnswer() {
    selector = getRandomNumber(0, (availableMultiplications.length - 1));
    question = availableMultiplications[selector];
    answer = availableProducts[selector];
}

function removeUsedQuestionsAndAnswers() {
    availableMultiplications.splice(selector, 1);
    availableProducts.splice(selector, 1);
}

/*
selectQuestionAndAnswer();
removeUsedQuestionsAndAnswers();

console.log(selector)
console.log(question);
console.log(answer);
console.log(availableMultiplications);
console.log(availableProducts);
*/
