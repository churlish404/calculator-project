import "./style.scss";
// Define global variables

const buttonClassNames: string[] = [
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
const initialInput: string[] = [];
const operations = /[-\/+*]/g;
let firstCalculation = true;
// const calculations: {}[] = [];
// let calculationIndex = 0;

/* DOM Element Variables */

const screen = document.querySelector(".calculator__screen") as HTMLElement;
const cancel = document.querySelector(
  ".calculator__buttons--operations"
) as HTMLButtonElement;

/* ______________________________________________________________________________ */

const start = () => {
  /* Function definitions */
  // gives each button (aside from cancel) a class defined by "buttonClassNames" arr
  const giveButtonClass = (buttonClassNames: string[]) => {
    const buttons = document.querySelectorAll("button");
    let counter = 0;
    for (let i = 1; i < buttons.length; i++) {
      buttons[i].classList.add(buttonClassNames[counter]);
      counter++;
    }
  };

  // function to check if screen is null
  const isScreenNull = (element: HTMLElement) => {
    if (!element) {
      throw new Error("Problem with screen element");
    }
    return false;
  };

  // function to check if button is null
  const isButtonNull = (eventTarget: HTMLButtonElement): HTMLButtonElement => {
    if (eventTarget === null) {
      throw new Error("Problem with button element");
    } else {
      return eventTarget;
    }
  };

  const validateInput = (userInput: string[]) => {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    // wanted to use includes() array method to check if array includes at least 1 number
    // in case user inputs just operators e.g. "+", "-"
    // used some() to check if is one of numbers array (0-9)
    // if no numbers in the array display error alert
    if (!numbers.some((i) => userInput.includes(i))) {
      alert("Please enter a valid calculation");
      start();
    } else return userInput;
  };

  // function to display a default value when load page
  const displayCalc = (inputArr: string[]) => {
    if (isScreenNull(screen)) {
      return;
    } else {
      const displayString = inputArr.join(" ");
      screen!.innerText = displayString;
      if (displayString.includes("=")) {
        return;
      }
    }
  };

  //displays calculation result
  const displayResult = (result: number | undefined) => {
    if (typeof result !== undefined) {
      const resultString = result as unknown as string;
      screen!.innerText = resultString;
      firstCalculation = false;
    }
    return;
  };

  //function to update the display
  const updateDisplay = (inputArr: string[] | undefined) => {
    const equals = /=/;

    if (typeof inputArr == undefined) {
      console.error("problem: inputArray is undefined");
    }
    // join array to use regex.test()
    const inputAsString = inputArr!.join("");
    // if equals is present at end of the input array -> do calculation
    //NEED TO EDIT HERE
    if (
      equals.test(inputAsString[inputAsString.length - 1]) &&
      firstCalculation
    ) {
      let result = evaluate(inputArr!);
      displayResult(result);
    } else {
      displayCalc(inputArr!);
    }
  };

  // function to handle button click
  const handleClick = (event: Event) => {
    // prevent bubbling so that individual button click results in multiple values being displayed
    event.stopPropagation();
    // storing clicked button and casting to HTMLButtonELement from EventTarget
    const button = event.currentTarget as HTMLButtonElement;
    const validButton = isButtonNull(button);
    const validButtonValue = validButton.textContent;
    // push text of button to an array to store user input
    initialInput.push(validButtonValue!);

    // check array userInput isn't garbage
    const validatedInput = validateInput(initialInput);
    // pass to display function
    updateDisplay(validatedInput);
  };

  // function to handle clear button click;
  const handleClearClick = (event: Event) => {
    event.preventDefault;
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
    if (button.className !== "cancel")
      button.addEventListener("click", handleClick);
  });

  const validClear = isButtonNull(cancel);
  validClear!.addEventListener("click", handleClearClick);
};

start();
