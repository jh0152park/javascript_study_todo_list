import { USER } from "./welcome.js";
import { INPUT_FORM } from "./welcome.js";

const TODO_FORM = document.querySelector("#todo");
const TODO_INPUT = document.querySelector("#todo input");
const TODO_BOARD = document.querySelector("#todo_board");
const TODO_BUTTON = document.querySelector("#todo_button");

let TODO_ITEMS = [];

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

function updateTodoItems() {
  localStorage.setItem("items", JSON.stringify(TODO_ITEMS));
}

function addTodoItem(set) {
  TODO_ITEMS.push({
    item: set.item,
    id: set.id,
  });
  updateTodoItems();
}

function updateItemsNumber() {
  const title = document.querySelector("#todo_board p");
  const update = document.createElement("p");

  if (title !== null) {
    TODO_BOARD.removeChild(title);
  }

  if (TODO_ITEMS.length) {
    update.innerText = `${TODO_ITEMS.length} to do items.`;
  } else {
    update.innerText = `Todo items are empty.`;
  }
  TODO_BOARD.insertBefore(update, TODO_BOARD.firstChild);
}

function removeItem(event) {
  const li = event.target.parentNode;

  li.remove();
  TODO_ITEMS = TODO_ITEMS.filter(
    (item) => parseInt(item.id) !== parseInt(li.id)
  );
  updateTodoItems();
  updateItemsNumber();
}

function fillupTodoBoard(set) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  button.addEventListener("click", removeItem);

  span.innerText = set.item;
  button.innerText = "🗑️";

  li.id = set.id;
  li.appendChild(span);
  li.appendChild(button);

  updateItemsNumber();
  TODO_BOARD.appendChild(li);
}

function handleInputTodoList(event) {
  event.preventDefault();

  const set = {
    item: TODO_INPUT.value,
    id: Date.now(),
  };

  TODO_INPUT.value = "";
  addTodoItem(set);
  fillupTodoBoard(set);
}

function updateInitialItemsStatus() {
  TODO_ITEMS = localStorage.getItem("items");
  if (TODO_ITEMS === null) {
    TODO_ITEMS = [];
    return true;
  }
  TODO_ITEMS = JSON.parse(TODO_ITEMS);
  TODO_ITEMS.forEach(fillupTodoBoard);
}

TODO_BUTTON.addEventListener("click", todoBoardSwitch);
TODO_FORM.addEventListener("submit", handleInputTodoList);

checkUserCondition();
updateInitialItemsStatus();
