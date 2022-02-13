const hrefs = {
    buttonStart: document.querySelector('[data-start]'),
    buttonStop: document.querySelector('[data-stop]'),
    disableStartButton() {
        this.buttonStart.disabled = true;
    },
    enableStartButton() {
        this.buttonStart.disabled = false;
    }
}
const INTERVAL_TIME = 1000;
let intervalId = null;
hrefs.buttonStart.addEventListener('click', onClickStart);
hrefs.buttonStop.addEventListener('click', onClickStop);

function onClickStart() {
    hrefs.disableStartButton()
    intervalId = setInterval(changeBackgroundColor, INTERVAL_TIME);
}

function onClickStop() {
    hrefs.enableStartButton()
    clearInterval(intervalId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}