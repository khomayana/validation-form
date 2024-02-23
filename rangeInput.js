const rangeInput = document.getElementById('countIncome');
const label = document.querySelector('.range-label');

rangeInput.oninput = (() => {
    let value = rangeInput.value;
    label.textContent = value;
    let percents = (value / rangeInput.max) * 100;
    rangeInput.style.background = `linear-gradient(to right, #E6E4EA ${percents}%, #D64200 ${percents}%`;
})