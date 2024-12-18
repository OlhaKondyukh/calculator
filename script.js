const resultText = document.getElementById("result");
const counting = document.getElementById("counting");
const numbers = document.querySelectorAll(".grid-block__button-number");
const operators = document.querySelectorAll(".grid-block__button-operator");
const equal = document.getElementById("equal");
const allClean = document.getElementById("allClean");
const clean = document.getElementById("clean");

let numbersArr = [[], []];
let index = 0;
let operatorValue = "";
let display = [];
let res;

function calculations(event) {
  let first = Number(numbersArr[0].join(""));
  let second = Number(numbersArr[1].join(""));

  if (display.length < 3) {
    display.push(numbersArr[index]);
  }
  counting.innerHTML = display.join("");
  console.log(numbersArr);
  console.log(`display: ${display}`);
  switch (operatorValue) {
    case "%":
      first = ((100 * second) / first).toFixed(2);
      break;
    case "+":
      res = first + second;
      break;
    case "-":
      res = first - second;
      break;
    case "*":
      res = first * second;
      break;
    case "/":
      res = first / second;
      break;
    default:
    //first = [];
  }
  res = res.toString();
  resultText.innerHTML = `=${res}`;
  numbersArr[0] = [res];
  numbersArr[1] = [];
  operatorValue = "";
  try {
    if (event.target.value === "=") {
      counting.innerHTML = res;
      display = [res];
      console.log("при непосредственном нажатии =");
      console.log(`display: ${display}`);
    }
  } catch {
    //
  }
}

//clean all previous calculations
function cleanAllArr() {
  numbersArr = [[], []];
  index = 0;
  operatorValue = "";
  resultText.innerHTML = 0;
  counting.innerHTML = "";
  display = [];
}

//delete the last element from the number arr
function cleanTheLastElementOfTheArr() {
  if (numbersArr !== undefined) {
    numbersArr[index].pop();
    display.pop();
    counting.innerHTML = display.join("");
    resultText.innerHTML = numbersArr[index].join("");
    if (numbersArr[index].length === 0) {
      resultText.innerHTML = 0;
    }
  }
}

// add event listener for numbers
numbers.forEach(function (number) {
  number.addEventListener("click", function (event) {
    //if any number is pressed after the result is entered, the array is reset to zero length
    if (display[0] == res && display[display.length - 1] !== operatorValue) {
      cleanAllArr();
    }
    if (index === 1) {
      //checking if was tapped operator after adding second number
      if (numbersArr[[0]].length !== 0 && operatorValue == "") {
        numbersArr[[0]] = [event.target.value];
        numbersArr[[1]] = [];
        index = 0;
      }
    }
    //checking that "." and "0" arу not a first element on the arrow
    if (event.target.value === "0") {
      if (numbersArr[0].length === 0 && numbersArr[1].length === 0) {
        //nothing
      } else {
        numbersArr[index].push(event.target.value);
        display.push(event.target.value);
        counting.innerHTML = display.join("");
        resultText.innerHTML = numbersArr[index].join("");
      }
    } else if (event.target.value === ".") {
      if (numbersArr[0].length === 0 && numbersArr[1].length === 0) {
        numbersArr[index].push("0");
        numbersArr[index].push(event.target.value);
        display.push("0");
        display.push(event.target.value);
        counting.innerHTML = display.join("");
        resultText.innerHTML = numbersArr[index].join("");
      } else {
        //nothing
      }
    } else {
      numbersArr[index].push(event.target.value);
      display.push(event.target.value);
      counting.innerHTML = display.join("");
      resultText.innerHTML = numbersArr[index].join("");
    }

    console.log(numbersArr);
    console.log(`display: ${display}`);
  });
});

// add event listener for operators
operators.forEach(function (operator) {
  operator.addEventListener("click", function (event) {
    //checking for a second number
    if (numbersArr[[1]].length !== 0) {
      calculations();
    }
    operatorValue = event.target.value;
    if (
      display[display.length - 1] !== "+" &&
      display[display.length - 1] !== "-" &&
      display[display.length - 1] !== "*" &&
      display[display.length - 1] !== "/" &&
      display[display.length - 1] !== "%"
    ) {
      display.push(operatorValue);
    } else {
      display.pop();
      display.push(operatorValue);
    }
    counting.innerHTML = display.join("");
    index = 1;

    console.log(operatorValue);
    console.log(`display [${display}]`);
  });
});

// add event listener for equel button
equal.addEventListener("click", calculations);

// add event listener for reset button
allClean.addEventListener("click", cleanAllArr);

// add event listener for clean button
clean.addEventListener("click", cleanTheLastElementOfTheArr);
