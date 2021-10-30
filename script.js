// Wait the DOM to finish loading before runnin the game
// Get the buttin element and add an event listener to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
                myFunction();

            }
        });
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })
    runGame("addition");
});

// The main game "loop", called when the script is first loaded
// and after the user's answer has been processed

function runGame(gameType) {
// Generate 2 random numbers between 0 & 25

    document.getElementById("answer-box").value = ""; // Erases the last typed answer
    document.getElementById("answer-box").focus(); // Puts the cursor in the answer box

    let num1 = Math.floor(Math.random()*25)+1;
    let num2 = Math.floor(Math.random()*25)+1;

    if(gameType == "addition") {
        displayAdditionQuestion(num1, num2);

    } 
        else if(gameType == "subtract") {
        displaySubtractQuestion(num1, num2); 
    }

        else if(gameType == "multiply") {
        displayMultiplyQuestion(num1, num2); 
    }

        else if(gameType == "division") {
            displayDivideQuestion(num1, num2); 
    }
        
    // else {
    //     alert(`unknown GameType ${gameType}`);
    //     throw `unknown GameType ${gameType}, aborting!`;
    // }
}

function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateRightAnswer(); // calculatedAnswer is an array
    let isCorrect = userAnswer === calculatedAnswer[0]; // isCorrect has a true or false value
    let operand1 = parseInt(document.getElementById("operand1").textContent);
    let operand2 = parseInt(document.getElementById("operand2").textContent);

    let modRemainder = operand1 % operand2; 
    let divoperand1 = operand1 - modRemainder;

    if (isCorrect) {
        alert("Hey! You got it right :D");
        incrementScore();
    }
    else {
        alert(`Awww...you answered ${userAnswer}, the correct answer was ${calculatedAnswer[0]} and remainder is ${modRemainder} and dividable number: ${divoperand1}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

function calculateRightAnswer() {
    // Get the operands and the operator directly from the DOM

    let operand1 = parseInt(document.getElementById("operand1").textContent);
    let operand2 = parseInt(document.getElementById("operand2").textContent);
    let operator = document.getElementById("operator").textContent;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "substract"];
    }  else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } 
    
    else {
        alert(`Uninmplemented operator ${operator}`);
        throw `Uninmplemented operator ${operator}, aborting!`;
    }

}

function incrementScore() {
// Gets the current score from the DOM and increments it


let oldScore = parseInt(document.getElementById("score").innerText);
document.getElementById("score").innerText = ++oldScore;

}

function incrementWrongAnswer() {

// get the current incorrect score from the DOM

let oldIncorrectScore = parseInt(document.getElementById("incorrect").innerText);
document.getElementById("incorrect").innerText = ++oldIncorrectScore;

}

function displayAdditionQuestion(operand1, operand2){

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

function displaySubtractQuestion(operand1, operand2){

    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2){

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivideQuestion(operand1, operand2){

    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "/";
    document.getElementById("operand1").textContent = (operand1 * operand2);
    document.getElementById("operand2").textContent = operand2;
}


function myFunction() {
    var x = document.getElementById("operand1").textContent;
    document.getElementById("demo1").innerHTML = `operand1 ${x}`;  
    var y = document.getElementById("operand2").textContent;
    document.getElementById("demo2").innerHTML = `operand2 ${y}`;

    var modRemainder = x % y; 
    var calculatedAnswer = calculateRightAnswer();
    let z = x + modRemainder;
    
    document.getElementById("demo3").innerHTML = `Remainder ${modRemainder}`; 
    document.getElementById("demo4").innerHTML = `Answer ${calculatedAnswer[0]}`; 
    document.getElementById("demo5").innerHTML = `dividable ${z}`; 
  }
