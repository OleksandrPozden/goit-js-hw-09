import { Notify } from 'notiflix';

const refs = {
    form: document.querySelector('.form'),

}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                return resolve({ position, delay })
            } else {
                return reject({ position, delay })
            }
        }, delay)
    })
    return promise

}

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const { elements: { amount, delay, step } } = e.target
    const data = {
        amount: parseInt(amount.value),
        delay: parseInt(delay.value),
        step: parseInt(step.value),
    }
    Notify.info(`Creating promises, please wait for ${data.delay/1000}s`, { timeout: data.delay })
    setTimeout(() => {
        console.log(data.amount)
        for (let i = 1; i < data.amount + 1; i++) {
            console.log(i)
            createPromise(i, data.step * i)
                .then(({ position, delay }) => Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
                .catch(({ position, delay }) => Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`))
        }
        Notify.info("Promises created!")
    }, data.delay)
}