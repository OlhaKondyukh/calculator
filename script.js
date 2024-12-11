const outputContent = document.getElementById("output_content");
const counting = document.getElementById("counting");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.getElementById("equal");
const reset = document.getElementById("reset");
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
  console.log(`display ${display}`);
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
  outputContent.innerHTML = `=${res}`;
  numbersArr[0] = [res];
  numbersArr[1] = [];
  operatorValue = "";
  try {
    if (event.target.value === "=") {
      counting.innerHTML = res;
      display = [res];
    }
  } catch {
    //
  }
}

//clean all previous calculations
function resetCalc() {
  numbersArr = [[], []];
  index = 0;
  operatorValue = "";
  outputContent.innerHTML = 0;
  counting.innerHTML = "";
  display = [];
}

//delete the last element from the number arr
function cleanArr() {
  if (numbersArr !== undefined) {
    numbersArr[index].pop();
    display.pop();
    counting.innerHTML = display.join("");
    outputContent.innerHTML = numbersArr[index].join("");
    if (numbersArr[index].length === 0) {
      outputContent.innerHTML = 0;
    }
  }
}

// add event listener for numbers
numbers.forEach(function (number) {
  number.addEventListener("click", function (event) {
    //if any number is pressed after the result is entered, the array is reset to zero
    if (display == res) {
      display.pop();
    }
    numbersArr[index].push(event.target.value);
    if (index === 1) {
      //check if was tapped operator after adding second number
      if (numbersArr[[0]].length !== 0 && operatorValue == "") {
        numbersArr[[0]] = [event.target.value];
        numbersArr[[1]] = [];
        index = 0;
      }
    }
    display.push(event.target.value);
    counting.innerHTML = display.join("");
    outputContent.innerHTML = numbersArr[index].join("");

    console.log(numbersArr);
    console.log(`display ${display}`);
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
    display.push(operatorValue);
    counting.innerHTML = display.join("");
    index = 1;

    console.log(operatorValue);
    console.log(`display [${display}]`);
  });
});

// add event listener for equel button
equal.addEventListener("click", calculations);

// add event listener for reset button
reset.addEventListener("click", resetCalc);

// add event listener for clean button
clean.addEventListener("click", cleanArr);
