const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const millisecondsLabel = document.getElementById("milliseconds");

const startButton = document.getElementById("startBtn");
const stopButton = document.getElementById("stopBtn");
const pauseButton = document.getElementById("pauseBtn");
const resumeButton = document.getElementById("resumeBtn");
const resetButton = document.getElementById("resetBtn");
const clearLapsButton = document.getElementById("clearLapsBtn");

const toggleDarkMode = document.getElementById("toggleDarkMode");
const lapList = document.getElementById("laplist");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
pauseButton.addEventListener("click", pauseTimer);
resumeButton.addEventListener("click", resumeTimer);
resetButton.addEventListener("click", resetTimer);
clearLapsButton.addEventListener("click", clearLaps);
toggleDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function startTimer() {
  interval = setInterval(updateTimer, 10);
  startButton.disabled = true;
  resumeButton.disabled = true;
}

function pauseTimer() {
  clearInterval(interval);
  resumeButton.disabled = false;
}

function resumeTimer() {
  interval = setInterval(updateTimer, 10);
  resumeButton.disabled = true;
  startButton.disabled = true;
}

function stopTimer() {
  clearInterval(interval);
  addToLapList();
  resetTimerData();
  startButton.disabled = false;
  resumeButton.disabled = true;
}

function resetTimer() {
  clearInterval(interval);
  resetTimerData();
  startButton.disabled = false;
  resumeButton.disabled = true;
}

function updateTimer() {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
  }
  displayTimer();
}

function displayTimer() {
  millisecondsLabel.textContent = padTime(milliseconds);
  secondsLabel.textContent = padTime(seconds);
  minutesLabel.textContent = padTime(minutes);
}

function padTime(time) {
  return time.toString().padStart(2, "0");
}

function resetTimerData() {
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  displayTimer();
}

function addToLapList() {
  const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(
    milliseconds
  )}`;
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <span>Lap ${lapList.childElementCount + 1}: ${lapTime}</span>
    <button onclick="this.parentElement.remove()">Sil</button>
  `;
  lapList.appendChild(listItem);
}

function clearLaps() {
  lapList.innerHTML = "";
}
