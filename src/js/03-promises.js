// const { formats } = require('flatpickr/dist/utils/formatting');
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  //   delay: document.querySelector('[name="delay"]'),
  //   step: document.querySelector('[name="step"]'),
  //   amount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onSubmit);

let position = 0;

function onSubmit(e) {
  e.preventDefault();

  let delay = Number(e.currentTarget.delay.value);
  const amount = Number(e.currentTarget.amount.value);
  const step = Number(e.currentTarget.step.value);
  for (let index = 0; index < amount; index++) {
    position = index;
    delay = delay + step;
    //     if (index === 1) {
    //       delay = delay;
    //     } else {
    //       delay = delay + step;
    //     }
    createPromise(position, delay).then(onFulfill).catch(onReject);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

function onFulfill({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function onReject({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
