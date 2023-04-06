
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let intervalId = null;

const changeBackgroundColor = () => {
  body.style.backgroundColor = getRandomHexColor();
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  intervalId = setInterval(changeBackgroundColor, 1000);
});

stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(intervalId);
});
