'use strict';

const PortfolioApp = {
    porfolio: [],
    'renderCoin': renderCoin,
    'renderPortfolio': renderPortfolio,
    'remove' : renderRemove,
    nameAllCoint: [],
    'fetchPrices': fetchPrices,
    'renderUpdate' : renderUpdate,
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

// render Update.
function renderUpdate(coin) {
    const buttonUpdate = document.querySelectorAll('.button-update');
    
    buttonUpdate.forEach(item => {
        item.addEventListener('click', () => {
            // need coin.
            fetchPrices(coin);
        });
    })
}

// add object.
function renderPortfolio (value) {

    const block = document.createElement("div");
    block.classList.add('card-coin');

    // проверяем текущую тему сайта напрямую, без отдельной переменной
    if (document.body.classList.contains('light')) {
        block.classList.add('card-coint-light');
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

    // show. 
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

    // button delete
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button-delete');
    deleteButton.textContent = 'DELETE';
    block.append(deleteButton);

    // button update.
    const updateButton = document.createElement('button');
    updateButton.classList.add('button-delete', 'button-update');
    updateButton.textContent = 'UPdate';
    block.append(updateButton);
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

                coint['nameCoin'] = document.querySelector(`[date-input="1"]`).value.toLowerCase();
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
                PortfolioApp.renderUpdate(coint);

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

// CHANGE THEME.
const changeTheme = function() {

    // change theme.
    // statusTheme = true;

    // change button.
    const button = document.querySelector('.theme-block');

    // function change.
    function changeForEven() {

        // take all object for change theme.
        const body = document.body;
        body.classList.toggle('light');

        // text.
        const text = document.querySelector('.main-text');
        text.classList.toggle('main-text-light');

        // form
        const form = document.querySelector('#form');
        form.classList.toggle('form-light');

        // theme block.
        button.classList.toggle('theme-block-light');

        // header.
        const header = document.querySelector('.header');
        header.classList.toggle('header-light');

        if (document.querySelector(".card-coin")) {
            const cardCoin = document.querySelectorAll(".card-coin");
            cardCoin.forEach(item => {
                item.classList.toggle('card-coint-light');
            });
        }
    }

    // evenLaptop.
    button.addEventListener('click', () => {
        changeForEven();
    });

    // evenTouch.
    document.addEventListener('DOMContentLoaded', () => {
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            changeForEven();
        });

        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            console.log(true);
        });
    })

};
changeTheme();