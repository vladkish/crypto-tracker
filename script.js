'use strict';

// data.
let statusTheme = false;

const PortfolioApp = {
    porfolio: [],
    'renderCoin': renderCoin,
    'renderPortfolio': renderPortfolio,
    'remove' : renderRemove,
    nameAllCoint: [],
    'fetchPrices': fetchPrices,
};

// remove object.
function renderRemove() {
    const sectionCard = document.querySelector('.coin-section');
    sectionCard.addEventListener('click', (e) => {
        if (e.target.textContent == 'DELETE') {
            e.target.parentElement.remove();
        }
    });
}

// add object.
function renderPortfolio (value) {

    // block.
    const block = document.createElement("div");
    
    block.classList.add('card-coin');
    if (!statusTheme) {
        statusTheme = true;
        block.classList.toggle('card-coint-light');
    } else {
        statusTheme = false;
    }

    document.querySelector('.coin-section').append(block);

    // h1.
    const textBlock = document.createElement('h1');
    textBlock.classList.add('name-coin');
    textBlock.textContent = value.nameCoin;
    block.append(textBlock);

    // price.
    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = value.currentPrice !== null
        ? `${value.currentPrice}$`
        : 'цена недоступна';
    block.append(price);

    // count.
    const count = document.createElement('p');
    count.classList.add('count-coin');
    count.textContent = `quantity ${value.countCoin}`;
    block.append(count);

    // minus.
    const minus = document.createElement('p');
    minus.classList.add('minus-coin');
    block.append(minus);

    // plus.
    const plus = document.createElement('p');
    plus.classList.add('plus-coin');
    block.append(plus);

    // work price
    const buyPrice = parseFloat(value.priceCoin);
    const amount = parseFloat(value.countCoin);
    const currentPrice = value.currentPrice;

    if (currentPrice !== null && !isNaN(buyPrice) && !isNaN(amount)) {
        const profit = (currentPrice - buyPrice) * amount;
        const profitPercent = ((currentPrice - buyPrice) / buyPrice) * 100;

        if (profit >= 0) {
            plus.textContent = `+${profit.toFixed(2)}$ (+${profitPercent.toFixed(1)}%)`;
            minus.textContent = '-----';
        } else {
            minus.textContent = `${profit.toFixed(2)}$ (${profitPercent.toFixed(1)}%)`;
            plus.textContent = '-----';
        }
    } else {
        plus.textContent = '-----';
        minus.textContent = '-----';
    }

    // button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button-delete');
    deleteButton.textContent = 'DELETE';
    block.append(deleteButton);
}   

// form.
function renderCoin() {
    const form = document.querySelector('#form');

    form.addEventListener('submit', async (e) => {

        const { porfolio, nameAllCoint } = PortfolioApp;

        const coint = {};
        e.preventDefault();

        if (!nameAllCoint.includes(document.querySelector(`[date-input="1"]`).value)) {

            const controlP = document.querySelector(`[date-input="1"]`).value == ''
            || document.querySelector(`[date-input="2"]`).value == ''
            || document.querySelector(`[date-input="3"]`).value == ''
            || document.querySelector(`[date-input="4"]`).value == ''

            if (!controlP) {

                coint['nameCoin'] = document.querySelector(`[date-input="1"]`).value;
                coint['countCoin'] = document.querySelector(`[date-input="2"]`).value;
                coint['priceCoin'] = document.querySelector(`[date-input="3"]`).value;
                coint['waitPriceCoin'] = document.querySelector(`[date-input="4"]`).value;

                porfolio.push(coint);
                nameAllCoint.push(document.querySelector(`[date-input="1"]`).value);
                form.reset();

                const priceData = await PortfolioApp.fetchPrices(coint.nameCoin);
                coint.currentPrice = (priceData && priceData[coint.nameCoin])
                    ? priceData[coint.nameCoin].usd
                    : null;

                PortfolioApp.renderPortfolio(coint);

                PortfolioApp.remove(); 
            } else {
                alert('problem');
            }
        } else {
            alert('we have that coin');
        }
    });
}
renderCoin();

// API funciton.
async function fetchPrices(coinIds) {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error : ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('You have problem wih price :', error);
        return null
    }
}