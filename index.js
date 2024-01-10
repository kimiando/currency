const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");
const API_KEY = "v6/28d152c117411c9242253bab";

const elements = [fromCurrency, toCurrency];

elements.forEach((select, i) => {
    for (let curCode in Country_List) {
        const selected = (i === 0 && curCode === "USD") || (i === 1 && curCode === "GBP") ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${curCode}" ${selected}>${curCode}</option>`);
    }

    select.addEventListener("change", () => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
});

async function getExchangeRate() {
    const amountVal = amount.value || 1;
    exRateTxt.innerText = "Getting exchange rate...";

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/${API_KEY}/latest/${fromCurrency.value}`);
        const result = await response.json();
        const exchangeRate = result.conversion_rates[toCurrency.value];
        const totalExRate = (amountVal * exchangeRate).toFixed(2);
        exRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    } catch (error) {
        exRateTxt.innerText = "Something went wrong...";
    }
}

window.addEventListener("load", getExchangeRate);
getBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

exIcon.addEventListener("click", () => {
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
    elements.forEach((select) => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
    getExchangeRate();
});
