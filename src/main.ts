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

let testNumbers = [2, 4, 6];

/* DOM Element Variables */

const screen = document.querySelector(".calculator__screen") as HTMLElement;
/* ______________________________________________________________________________ */

/* Function definitions */
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
const displayValue = (value: string) => {
  if (isScreenNull(screen)) {
    return;
  } else {
    screen!.innerText = value;
    return `test`;
  }
};

//function to update the display

const updateDisplay = (buttonClicked: HTMLButtonElement) => {
  const value = buttonClicked.textContent;
  displayValue(value!);
};

// function to handle button click
const handleClick = (event: Event) => {
  // storing clicked button and casting to HTMLButtonELement from EventTarget
  const button = event.currentTarget as HTMLButtonElement;
  const validButton = isButtonNull(button);
  updateDisplay(validButton);
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
    result += number;
  });
  return result;
};

const subtract = (numberArray: number[]) => {
  let result: number = numberArray[0] - numberArray[1];
  return result;
};

// function calls
/* _______________________________________________________________________*/
giveButtonClass(buttonClassNames);

getButtons();

buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
