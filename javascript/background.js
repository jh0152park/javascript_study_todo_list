const IMAGE_COUNT = 10;
const IMAGES = [
  "0.jpg",
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function setBackgroundImage() {
  const img = "./background_image/" + IMAGES[getRandomInt(0, IMAGE_COUNT)];
  document.body.style.backgroundImage = "url(" + img + ")";
  document.body.style.backgroundSize = "cover";
}

setBackgroundImage();
