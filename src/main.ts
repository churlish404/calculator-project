import "./style.scss";

// strings array to store text on buttons and assign grid area
const buttonClassNames: string[] = [
  "clear-all",
  "sign",
  "percentage",
  "divide",
  "seven",
  "eight",
  "nine",
  "multiply",
  "four",
  "five",
  "six",
  "subtract",
  "one",
  "two",
  "three",
  "add",
  "zero",
  "equals",
  "decimal",
];
// global variables
// user input arr
let userInput: string[] = [];

// get all HTML button elements store in an array
const buttons = document.querySelectorAll("button");
// get screen element to display calculations and results
const screen = document.querySelector(".calculator__screen");

// checking in case querySelectorAll() has returned empty NodeList
if (!buttons.length || !screen) {
  throw new Error("problem retrieving HTML buttons");
}
/* __________________________________________________________ */
// function declarations
const giveButtonClass = (buttonClassNames: string[]) => {
  const buttons = document.querySelectorAll("button");
  let counter = 0;
  buttons.forEach((button) => {
    button.classList.add(buttonClassNames[counter]);
    counter++;
  });
};
/* __________________________________________________________ */
// register button click store value of button
const handleButtonClick = (event: Event) => {
  const button = event.currentTarget as HTMLButtonElement;

  // if is clear button call clear() function
  if (button.classList.contains("clear-all")) {
    // call clear function here
    console.log("clear");
  } else {
    const buttonValue: string = button.textContent!;
    userInput.push(buttonValue);
  }
  handleCalculation(userInput);
};

/* __________________________________________________________ */

// function to accept values of handleButton click
// assemble string
// seperate numbers and operators

const handleCalculation = (userInput: string[]) => {
  const input = userInput.join("");
  // if input string matches pattern of a number return to numbers array
  const numbers = input.match(/-?\d+\.*\d*/g) as string[];
  // likewise for operators
  const operator = input.match(/[\-÷+x]/g) as unknown as string[];
  const calculation = input.match(
    /[-?\d+\.*\d*)][\-÷+x][-?\d+\.*\d+]/g
  ) as string[];
  displayCalc(input);
  if (calculation && input[input.length - 1] == "=") {
    evaluate(numbers, operator!);
  }
};

// operation functions
const add = (numberArr: number[]): number => {
  let result: number = 0;
  numberArr.forEach((number: number) => {
    result += number;
  });
  return result;
};

const subtract = (numberArr: number[]): number => {
  let result = numberArr[0];
  // removes start value so don't subtract off total
  numberArr.shift();
  numberArr.forEach((number) => {
    // regex appending - sign to every number following first digit
    // multiply by -1 to reverse
    number = number * -1;
    result -= number;
  });
  return result;
};

const multiply = (numberArr: number[]): number => {
  let result = 1;
  numberArr.forEach((number) => {
    result *= number;
  });
  return result;
};

const divide = (numberArr: number[]): number => {
  let result = numberArr[0];
  numberArr.shift();
  numberArr.forEach((number) => {
    result /= number;
  });
  return result;
};

// flow-control functions ______________________________________

const evaluate = (stringArr: string[], operator: string[]) => {
  // replace to match regex return
  operator[0].toString().replace("x", "*");
  // e.g. convert "12" to 12 for arithmetic
  const numberArr = stringArr.map((number) => {
    return Number(number);
  });

  let result: number;
  // based on operator perform the relevant calculation
  switch (operator[0]) {
    case "+":
      result = add(numberArr);
      break;
    case "-":
      result = subtract(numberArr);
      break;
    case "x":
      result = multiply(numberArr);
      break;
    case "÷":
      result = divide(numberArr);
      break;
    default:
      result = 0;
      console.log("default used");
  }

  // push result into first position in inputArr
  const storedResults = [result];

  // pass result to display function
  displayResult(result);
};
/* __________________________________________________________ */

// display functions
const displayCalc = (calculation: string) => {
  screen.innerHTML = calculation;
};

const displayResult = (result: number) => {
  const resultAsString = result.toString();
  screen.innerHTML = resultAsString;
};

/* __________________________________________________________ */

// function calls

giveButtonClass(buttonClassNames);

//add event listener to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
