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

// get all HTML button elements store in an array
const buttons = document.querySelectorAll("button");

// checking in case querySelectorAll() has returned empty NodeList
if (buttons.length === 0) {
  throw new Error("problem retrieving HTML buttons");
}

// function declarations
const giveButtonClass = (buttonClassNames: string[]) => {
  const buttons = document.querySelectorAll("button");
  let counter = 0;
  buttons.forEach((button) => {
    button.classList.add(buttonClassNames[counter]);
    counter++;
  });
};

// register button click store value of button
const handleButtonClick = (event: Event) => {
  const button = event.currentTarget as HTMLButtonElement;

  // if is clear button call clear() function
  if (button.classList.contains("clear-all")) {
    // call clear function here
    console.log("clear");
  } else {
    const buttonValue: string = button.textContent!;
    return buttonValue;
  }
};

// function calls

giveButtonClass(buttonClassNames);

//add event listener to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
