// Selectors
const resultOutput = document.querySelector("#result");
const copyBtn = document.querySelector("#copy-btn");
const copiedText = document.querySelector("#copied-text");
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

let checkedCounter = 0;

const strengthHandler = (counter, passwordLength) => {
  if (counter == 1) {
    return "Weak";
  } else if (counter == 2 && passwordLength >= 2) {
    return "Fair";
  } else if (counter == 3 && passwordLength >= 4) {
    return "Medium";
  } else if (counter == 4 && passwordLength >= 6) {
    return "Strong";
  } else {
    if (counter == 2) {
      return "Weak";
    } else if (counter == 3) {
      return "Fair";
    } else if (counter == 4) {
      return "Medium";
    }
  }
};

const strengthContainerHandler = () => {
  const passwordLength = progressBar.value;

  const strength = strengthHandler(checkedCounter, passwordLength);
  let blocksToFill = 0;

  switch (strength) {
    case "Weak":
      blocksToFill = 1;
      break;
    case "Fair":
      blocksToFill = 2;
      break;
    case "Medium":
      blocksToFill = 3;
      break;
    case "Strong":
      blocksToFill = 4;
      break;
  }

  for (let i = 0; i < blocksToFill; i++) {
    strengthShow[i].classList.add(...classes);
  }
  for (let i = blocksToFill; i < strengthShow.length; i++) {
    strengthShow[i].classList.remove(...classes);
  }
  strengthText.textContent = strength;
};

checkers.forEach((checker, index) => {
  checker.addEventListener("click", () => {
    if (checker.checked) {
      strengthShow[index].classList.add(...classes);
      checkedCounter++;
    } else {
      checkedCounter--;
    }

    strengthContainerHandler();
  });
});

const counterChange = () => {
  const value = progressBar.value;
  progressCounter.innerText = value;
  strengthContainerHandler();
  return value;
};

const copyToClipboard = async () => {
  try {
    if (!resultOutput.value) {
      copyBtn.classList.add("animate__shakeY", "text-red-600");
      copyBtn.addEventListener("animationend", () => {
        copyBtn.classList.remove("animate__shakeY", "text-red-600");
      });
      return;
    }
    await navigator.clipboard.writeText(resultOutput.value);
    copiedText.classList.add("animate__fadeInUp", "opacity-100");
    copiedText.addEventListener("animationend", () => {
      copiedText.classList.remove("animate__fadeInUp", "opacity-100");
    });
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

// Listeners
progressBar.addEventListener("input", counterChange);
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyToClipboard);
