import { USER } from "./welcome.js";
import { INPUT_FORM } from "./welcome.js";

const TODO_INPUT = document.querySelector("#todo input");
const TODO_BOARD = document.querySelector("#todo_board");
const TODO_BUTTON = document.querySelector("#todo_button");

function handleInputUser() {
  TODO_INPUT.classList.remove("hide");
}

function todoBoardSwitch() {
  TODO_BOARD.classList.toggle("hide");
}

function checkUserCondition() {
  if (USER !== null) {
    TODO_INPUT.classList.remove("hide");
  } else {
    INPUT_FORM.addEventListener("submit", handleInputUser);
  }
}

checkUserCondition();
TODO_BUTTON.addEventListener("click", todoBoardSwitch);
