'use strict';

const PortfolioApp = {
    porfolio : [],
    'render' : renderCoin,
    nameAllCoint : [],
};

function renderCoin() {

    const form = document.querySelector('#form');
    
    form.addEventListener('submit', (e) => {

        const {porfolio, nameAllCoint} = PortfolioApp;

        const coint = {};
        e.preventDefault();

        if (!nameAllCoint.includes(document.querySelector(`[date-input="1"]`).value)) {

            coint['nameCoin'] = document.querySelector(`[date-input="1"]`).value;
            coint['countCoin'] = document.querySelector(`[date-input="2"]`).value;
            coint['priceCoin'] = document.querySelector(`[date-input="3"]`).value;
            coint['waitPriceCoin'] = document.querySelector(`[date-input="4"]`).value;

            porfolio.push(coint);
            nameAllCoint.push(document.querySelector(`[date-input="1"]`).value);
        }

        form.reset();
    });
}

PortfolioApp['render']();
console.log(PortfolioApp.porfolio);