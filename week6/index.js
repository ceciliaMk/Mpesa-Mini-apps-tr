const coinCounter = (amount, coins = [25, 10, 5, 1], result = []) => {
    if (amount === 0) return result;

    const currentCoin = coins[0];
    const count = Math.floor(amount / currentCoin);
    const remainingAmount = amount % currentCoin;

    return coinCounter(remainingAmount, coins.slice(1), [...result, [currentCoin, count]]);
};

const makeCoinCounter = () => {
    const coins = [25, 10, 5, 1];  // Quarters, dimes, nickels, pennies

    const coinCounter = (amount, coinsIndex = 0, result = []) => {
        if (amount === 0 || coinsIndex >= coins.length) return result;

        const currentCoin = coins[coinsIndex];
        const count = Math.floor(amount / currentCoin);
        const remainingAmount = amount % currentCoin;

        return coinCounter(remainingAmount, coinsIndex + 1, [...result, [currentCoin, count]]);
    };

    return coinCounter;
};

document.getElementById('coinForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const amountInput = document.getElementById('amount').value;
    const amount = Math.floor(parseFloat(amountInput) * 100);  // Convert dollars to cents

    // Use the closure-based coin counter
    const counter = makeCoinCounter();
    const result = counter(amount);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    result.forEach(([coin, count]) => {
        let coinName;
        switch(coin) {
            case 25: coinName = 'Quarters'; break;
            case 10: coinName = 'Dimes'; break;
            case 5: coinName = 'Nickels'; break;
            case 1: coinName = 'Pennies'; break;
        }
        resultDiv.innerHTML += `<p>${coinName}: ${count}</p>`;
    });
});
