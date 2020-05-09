const currencyOneEl = document.getElementById("currency-one");
const amountOneEl = document.getElementById("amount-one");
const currencyTwoEl = document.getElementById("currency-two");
const amountTwoEl = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculate() {
  const currencyOne = currencyOneEl.value;
  const currencyTwo = currencyTwoEl.value;

  fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currencyTwo];
      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountTwoEl.value = (amountOneEl.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyOneEl.addEventListener("change", calculate);
amountOneEl.addEventListener("input", calculate);
currencyTwoEl.addEventListener("change", calculate);
amountTwoEl.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const tmpCur = currencyOneEl.value;
  currencyOneEl.value = currencyTwoEl.value;
  currencyTwoEl.value = tmpCur;

  const tmpAmo = amountOneEl.value;
  amountOneEl.value = amountTwoEl.value;
  amountTwoEl.value = tmpAmo;

  calculate();
});

calculate();
