const p = document.querySelector("p");
let numbersArr = [[], []];
let index = 0;
let operatorValue = "";

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.getElementById("equal");
const reset = document.getElementById("reset");

function calculations() {
  let first = Number(numbersArr[0].join(""));
  let second = Number(numbersArr[1].join(""));
  console.log(numbersArr);
  switch (operatorValue) {
    case "%":
      first = ((100 * second) / first).toFixed(2);
      break;
    case "+":
      first += second;
      break;
    case "-":
      first -= second;
      break;
    case "*":
      first *= second;
      break;
    case "/":
      first /= second;
      break;
    default:
    //first = [];
  }
  first = first.toString();
  p.innerHTML = first;
  numbersArr[0] = [first];
  numbersArr[1] = [];
  operatorValue = "";
}

function resetCalc() {
  numbersArr = [[], []];
  index = 0;
  operatorValue = "";
  p.innerHTML = 0;
}

// add event listener for numbers
numbers.forEach(function (number) {
  number.addEventListener("click", function (event) {
    numbersArr[index].push(event.target.value);
    if (index === 1) {
      if (numbersArr[[0]].length !== 0 && operatorValue == "") {
        numbersArr[[0]] = [event.target.value];
        numbersArr[[1]] = [];
        index = 0;
      }
    }
    console.log(numbersArr);
    p.innerHTML = numbersArr[index].join("");
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
    console.log(operatorValue);
    index = 1;
    p.innerHTML = operatorValue;
  });
});

// add event listener for equel button
equal.addEventListener("click", calculations);

// add event listener for reset button
reset.addEventListener("click", resetCalc);
