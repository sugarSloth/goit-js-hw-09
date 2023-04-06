import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const datePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future.");
      return;
    }

    // дозволити натискати кнопку "Start", якщо вибрана дата є в майбутньому
    document.querySelector('[data-start]').disabled = false;

    // очищуємо таймер, якщо були раніше показані значення
    clearTimer();
    
    // запускаємо таймер при натисканні на кнопку "Start"
    document.querySelector('[data-start]').addEventListener('click', () => {
      startTimer(selectedDate);
    });
  },
});

function startTimer(endDate) {
  const timerElement = document.querySelector('.timer');
  const daysElement = timerElement.querySelector('[data-days]');
  const hoursElement = timerElement.querySelector('[data-hours]');
  const minutesElement = timerElement.querySelector('[data-minutes]');
  const secondsElement = timerElement.querySelector('[data-seconds]');

  function updateTimer() {
    const now = new Date().getTime();
    const distance = endDate.getTime() - now;

    if (distance < 0) {
      // дата минула, зупиняємо таймер
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // оновлюємо значення на сторінці
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
  }

  // запускаємо перше оновлення таймера
  updateTimer();

  // оновлюємо таймер кожну секунду
  const timerInterval = setInterval(updateTimer, 1000);
}

function clearTimer() {
  const timerElement = document.querySelector('.timer');
  const daysElement = timerElement.querySelector('[data-days]');
  const hoursElement = timerElement.querySelector('[data-hours]');
  const minutesElement = timerElement.querySelector('[data-minutes]');
  const secondsElement = timerElement.querySelector('[data-seconds]');

  // очищуємо значення на сторінці
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
}
