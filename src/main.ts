import "./style.scss";
// Define global variables

const buttonClassNames: string[] = [
  "cancel",
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

const buttons: HTMLButtonElement[] = [];

// test array

const userInput: (string | number)[] = [];
const operations = /[-\/+*]/g;

/* DOM Element Variables */

const screen = document.querySelector(".calculator__screen") as HTMLElement;
/* ______________________________________________________________________________ */

/* Function definitions */
// gives each button a class defined by "buttonClassNames" arr
const giveButtonClass = (buttonClassNames: string[]) => {
  const buttons = document.querySelectorAll("button");
  let counter = 0;
  buttons.forEach((button) => {
    button.classList.add(buttonClassNames[counter]);
    counter++;
  });
};

// function to check if screen is null
const isScreenNull = (element: HTMLElement | null) => {
  if (typeof element === null) {
    throw new Error("Problem with screen element");
  }
  return false;
};

// function to check if button is null
const isButtonNull = (eventTarget: HTMLButtonElement) => {
  if (typeof eventTarget === null) {
    throw new Error("Problem with button element");
  }
  return eventTarget;
};

// function to display a default value when load page
const displayValue = (InputArr: string[]) => {
  if (isScreenNull(screen)) {
    return;
  } else {
    const displayString = InputArr.join(" ");
    screen!.innerText = displayString;
    return;
  }
};

//function to update the display
const updateDisplay = (inputArr: string[]) => {
  const equals = /=/;
  // join array to use regex.test()
  const inputAsString = inputArr.join("");
  // if equals is present at end of the input array -> do calculation
  if (equals.test(inputAsString[inputAsString.length - 1])) {
    const result = evaluate(inputArr);
    console.log(result);
  }
  displayValue(inputArr);
};

// function to handle button click
const handleClick = (event: Event) => {
  // storing clicked button and casting to HTMLButtonELement from EventTarget
  const button = event.currentTarget as HTMLButtonElement;
  const validButton = isButtonNull(button);
  const validButtonValue = validButton.textContent;
  // push to an array to store user input
  userInput.push(validButtonValue!);
  // pass to display function
  updateDisplay(userInput);
};

// function to get button elements and store in TS array
const getButtons = () => {
  const buttonElements = document.querySelectorAll("button");
  buttonElements.forEach((element: HTMLButtonElement) => {
    buttons.push(element);
  });
};

// operation functions
const add = (numberArray: number[]) => {
  let result: number = 0;
  numberArray.forEach((number: number) => {
    if (!isNaN(number)) {
      result += number;
    }
  });
  return result;
};

const subtract = (numberArray: number[]) => {
  let result = numberArray[0];
  // removes start value so don't subtract off total
  numberArray.shift();
  numberArray.forEach((number) => {
    if (!isNaN(number)) {
      result -= number;
    }
  });
  return result;
};

const multiply = (numberArray: number[]) => {
  let result = 1;
  numberArray.forEach((number) => {
    if (!isNaN(number)) {
      result *= number;
    }
  });
  return result;
};

const divide = (numberArray: number[]) => {
  let result = numberArray[0];
  numberArray.shift();
  numberArray.forEach((number) => {
    if (!isNaN(number)) {
      result /= number;
    }
  });
  return result;
};
// flow-control functions ______________________________________

const evaluate = (inputArr: string[]): number | undefined => {
  const inputString = inputArr.join("").replace("x", "*").replace("÷", "/");
  const expression = operations.exec(inputString as string);

  const inputArrToNumbers = inputArr.map((input) => {
    return Number(input);
  });

  let result: number | undefined;
  switch (expression![0]) {
    case "+":
      result = add(inputArrToNumbers);
      break;
    case "-":
      result = subtract(inputArrToNumbers);
      break;
    case "*":
      result = multiply(inputArrToNumbers);
      break;
    case "/":
      result = divide(inputArrToNumbers);
      break;
  }
  return result;
};

// function calls
/* _______________________________________________________________________*/
giveButtonClass(buttonClassNames);

getButtons();

buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
