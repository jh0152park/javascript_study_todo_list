function updateCurrentTime() {
  const date = new Date();
  const hour = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  const sec = date.getSeconds().toString().padStart(2, "0");
  const clock = document.querySelector("#clock");

  clock.innerText = `${hour}:${min}:${sec}`;
}

function updateCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = document.querySelector("#date");

  today.innerText = `${year}/${month}/${day}`;
}

setInterval(updateCurrentTime, 1000);
setInterval(updateCurrentDate, 1000);
