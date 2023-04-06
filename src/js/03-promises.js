
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const submitBtn = formEl.lastElementChild;

submitBtn.classList.add('btn');

formEl.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(event) {
  event.preventDefault();

  const { delay, step, amount } = formValuesPicker(event);

  for (let position = 1; position <= amount; position++) {
    const promiseDelay = delay + (position - 1) * step;

    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);      
      });
  }     

  event.currentTarget.reset();
}

function formValuesPicker(event) {
  const delay = Number(event.currentTarget.elements.delay.value);
  const step = Number(event.currentTarget.elements.step.value);
  const amount = Number(event.currentTarget.elements.amount.value);

  if (isNaN(delay) || isNaN(step) || isNaN(amount)) {
    throw new Error('Invalid form values');
  }

  return { delay, step, amount };
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);        
  }) 
}
