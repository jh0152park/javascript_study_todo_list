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

function getWelcomeSentence() {
  const date = new Date();
  const hour = date.getHours();

  if (hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

function updateWelcomeSentence() {
  WELCOME.innerText = `${getWelcomeSentence()}, ${USER}`;
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
