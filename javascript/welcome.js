let USER = localStorage.getItem("user_name");
const INPUT = document.querySelector("#input input");
const WELCOME = document.querySelector("#hello span");

function handleInputUser(event) {
  event.preventDefault();

  USER = INPUT.value;
  localStorage.setItem("user_name", USER);

  INPUT.classList.add("hide");
  updateWelcomeSentence();
}

function updateWelcomeSentence() {
  WELCOME.innerText = `Welcome ${USER}`;
  WELCOME.classList.remove("hide");
}

function checkUserCondition() {
  if (USER === null) {
    WELCOME.classList.add("hide");
  } else {
    INPUT.classList.add("hide");
    updateWelcomeSentence();
  }
}

addEventListener("submit", handleInputUser);
checkUserCondition();
