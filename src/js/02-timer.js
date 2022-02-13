// Описаний в документації
import flatpickr from "flatpickr";
import { Notify } from "notiflix";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";


let timestamp = null;
let intervalId = null;
const refs = {
    datetimePicker: document.querySelector("input#datetime-picker"),
    timer: {
        days: document.querySelector('[data-days]'),
        hours: document.querySelector('[data-hours]'),
        minutes: document.querySelector('[data-minutes]'),
        seconds: document.querySelector('[data-seconds]'),
    },
    startBtn: document.querySelector("[data-start]"),
    enableStartBtn() {
        this.startBtn.disabled = false;
    },
    disableStartBtn() {
        this.startBtn.disabled = true;
    }
}
const flatpickrOptions = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const timestampNow = new Date().getTime();
        timestamp = selectedDates[0].getTime() - timestampNow;
        if (timestamp < 0) {
            Notify.failure("Please choose a date in the future");
            return;
        }
        refs.enableStartBtn();

    },
    onReady() {
        refs.disableStartBtn();
    }
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

flatpickr(refs.datetimePicker, flatpickrOptions)

refs.startBtn.addEventListener('click', onClickStart)

function onClickStart() {
    updateTime();
    intervalId = setInterval(updateTime, 1000);
}

function updateTime() {
    timestamp = timestamp - 1000;
    if (timestamp < 1000) {
        clearInterval(intervalId);
    }
    const { days, hours, minutes, seconds } = convertMs(timestamp);
    refs.timer.days.textContent = days.toString().padStart(2, "0");
    refs.timer.hours.textContent = hours.toString().padStart(2, "0");
    refs.timer.minutes.textContent = minutes.toString().padStart(2, "0");
    refs.timer.seconds.textContent = seconds.toString().padStart(2, "0");
}