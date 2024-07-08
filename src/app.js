// Selectors
const resultOutput = document.querySelector("#result");
const copyBtn = document.querySelector("#copy-btn");
const progressCounter = document.querySelector("#progress-count");
const progressBar = document.querySelector("#progress-bar");
const generateBtn = document.querySelector("#generate-btn");
const strengthShow = document.querySelectorAll(".strength-show");
const checkers = document.querySelectorAll(".checker");
const strengthText = document.querySelector("#strength");

// password criterion
const strength = ["weak", "fair", "medium", "strong"];
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz".split("");
const numbers = "0123456789".split("");
const symbols = "!@#$%^&*()_+[]{}|;:',.<>?/`~".split("");
const classes = ["bg-yellow-400", "border-yellow-400"];

// Handlers
const options = () => {
  const optionsArr = [];
  if (checkers[0].checked) optionsArr.push(uppercaseLetters);
  if (checkers[1].checked) optionsArr.push(lowercaseLetters);
  if (checkers[2].checked) optionsArr.push(numbers);
  if (checkers[3].checked) optionsArr.push(symbols);

  return optionsArr;
};

const generatePassword = () => {
  let result = [];
  const passwordCounter = progressCounter.innerText;
  const passwordOptions = options();
  if (passwordOptions.length < 1 || passwordCounter < 1) {
    alert(
      "Choose one of them first or character length must be greater than 0"
    );
  }
  const categoriesLength = passwordOptions.length;
  for (let i = 0; i < passwordCounter; i++) {
    let category =
      passwordOptions[Math.floor(Math.random() * categoriesLength)];
    let char = category[Math.floor(Math.random() * category.length)];

    result[i] = char;
  }
  resultOutput.value = result.join("");
  return result.join("");
};

const counterChange = () => {
  const value = progressBar.value;
  progressCounter.innerText = value;
};

let checkedCounter = 0;

const strengthHandler = (counter) => {
  if (counter < 1) {
    strengthText.innerText = "";
    return;
  }
  strengthText.innerText = strength[counter - 1];
};

checkers.forEach((checker, index) => {
  checker.addEventListener("click", () => {
    if (checker.checked) {
      strengthShow[index].classList.add(...classes);
      checkedCounter++;
    } else {
      checkedCounter--;
    }
    for (let i = 0; i < checkedCounter; i++) {
      strengthShow[i].classList.add(...classes);
    }
    for (let i = checkedCounter; i < strengthShow.length; i++) {
      strengthShow[i].classList.remove(...classes);
    }
    strengthHandler(checkedCounter);
  });
});

// Listeners
progressBar.addEventListener("input", counterChange);
generateBtn.addEventListener("click", generatePassword);
