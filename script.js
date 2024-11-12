const p = document.querySelector("p");
let numbersArr = [[], []];
let index = 0;
let operatorValue = "";

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.getElementById("equal");
const reset = document.getElementById("reset");

// add event listener for numbers
numbers.forEach(function (number) {
  number.addEventListener("click", function (event) {
    numbersArr[index].push(event.target.value);
    p.innerHTML = numbersArr[index].join("");
    console.log(numbersArr);
  });
});

// add event listener for operators
operators.forEach(function (operator) {
  operator.addEventListener("click", function (event) {
    operatorValue = event.target.value;
    console.log(operatorValue);
    index = 1;
    p.innerHTML = operatorValue;
  });
});

// add event listener for equel button
equal.addEventListener("click", function () {
  let first = Number(numbersArr[0].join(""));
  let second = Number(numbersArr[1].join(""));
  p.style.fontSize = "30px";

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
      first = [];
  }
  p.innerHTML = first;
  numbersArr[0] = [first];
  numbersArr[1] = [];
  operatorValue = "";
});

// add event listener for reset button
reset.addEventListener("click", function () {
  numbersArr = [[], []];
  index = 0;
  operatorValue = "";
  p.innerHTML = 0;
  p.style.fontSize = "30px";
});
