function updateCurrentTime() {
  const date = new Date();
  const hour = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  const sec = date.getSeconds().toString().padStart(2, "0");
  const clock = document.querySelector("#clock");
  clock.innerText = `${hour}:${min}:${sec}`;
}

setInterval(updateCurrentTime, 1000);
