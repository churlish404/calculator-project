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
const storedResults: number[] = [];

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
const clearScreen = () => {
  screen.textContent = " ";
  userInput = [];
};

const changeSign = (number: string) => {
  userInput.unshift(`-`);
  return Number(number) * -1;
};
/* __________________________________________________________ */
// register button click store value of button
const handleButtonClick = (event: Event) => {
  const button = event.currentTarget as HTMLButtonElement;

  // if is clear button call clear() function
  if (button.classList.contains("clear-all")) {
    clearScreen();
    return;
  } else {
    const buttonValue: string = button.textContent!;
    if (button.classList.contains("sign")) {
      // changeSign function returns appropriate number to array
      changeSign(userInput[0]);
    } else {
      userInput.push(buttonValue);
    }
  }
  handleCalculation(userInput);
};

/* __________________________________________________________ */

// function to accept values of handleButton click
// assemble string
// separate numbers and operators
// calls display function or
// evaluate

const handleCalculation = (userInput: string[]) => {
  let input = userInput.join("");
  // indexing variable to track how many calculations have been performed
  let calculationIndex: number = 0;
  // variable true when input is "2+ " and false if "2+2" or "2+2="
  let chainedOperator: boolean;
  // if input string matches pattern of a number return to numbers array
  const numbers = input.match(/-?\d+\.*\d*/g) as string[];
  // likewise for operators
  const operator = input.match(/[\-÷+x%]/g) as unknown as string[];
  const calculation = input.match(
    /[-?\d+\.*\d*)][\-÷+x][-?\d+\.*\d+]/g
  ) as string[];
  console.log(numbers);
  console.log(calculation);
  displayCalc(input);
  // if (input[input.length - 1] == operator[calculationIndex]) {
  //   chainedOperator = true;
  //   chainedOperator = displayCalc(
  //     input,
  //     chainedOperator,
  //     operator[calculationIndex]
  //   );
  //   calculationIndex++;
  if (calculation && input[input.length - 1] == "=") {
    evaluate(numbers, operator!);
  } else if (input[input.length - 1] == "%") {
    const formattedInput = Number(input.replace("%", "")) as number;
    percentage(formattedInput);
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

const percentage = (result: number) => {
  result = result / 100;
  console.log(result);
  displayResult(result);
};

// flow-control functions ______________________________________

const evaluate = (stringArr: string[], operator: string[]) => {
  // replace to match regex return
  operator[operator.length - 1].toString().replace("x", "*");
  // e.g. convert "12" to 12 for arithmetic
  const numberArr = stringArr.map((number) => {
    return Number(number);
  });

  let result: number;
  // based on operator perform the relevant calculation
  switch (operator[operator.length - 1]) {
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

  // add result into first position in storedResults
  storedResults.push(result);

  // pass result to display function
  displayResult(result);
};
/* __________________________________________________________ */

// display functions
const displayCalc = (
  calculation: string,
  chainedOperator?: boolean,
  operator?: string
): boolean => {
  screen.innerHTML = calculation;
  const numberQuantity = calculation.replace(/[^0-9]/g, "").length;

  if (chainedOperator && numberQuantity >= 2) {
    screen.innerHTML = `${storedResults[0]} ${operator}`;
    chainedOperator = false;
  }
  return chainedOperator as boolean;
};

const displayResult = (result: number) => {
  const resultAsString = result.toFixed(2).toString();
  screen.textContent = resultAsString;
};

/* __________________________________________________________ */

// function calls

giveButtonClass(buttonClassNames);

//add event listener to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
