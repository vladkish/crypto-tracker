'use strict';

// data.
const PortfolioApp = {
    porfolio: [],
    'renderCoin': renderCoin,
    'renderPortfolio': renderPortfolio,
    'remove' : renderRemove,
    nameAllCoint: [],
};

// remove object.
function renderRemove() {
    const sectionCard = document.querySelector('.coin-section');
    sectionCard.addEventListener('click', (e) => {
        if (e.target.textContent == 'DELETE') {
            e.target.parentElement.remove();
        }
    })
}

// add object.
function renderPortfolio () {

    for (const value of this.porfolio) {

        // block.
        const block = document.createElement("div");
        block.classList.add('card-coin');
        document.querySelector('.coin-section').append(block);

        // h1.
        const textBlock = document.createElement('h1');
        textBlock.classList.add('name-coin');
        textBlock.textContent = value.nameCoin;
        block.append(textBlock);

        // price.
        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = value.priceCoin;
        block.append(price);

        // count.
        const count = document.createElement('p');
        count.classList.add('count-coin');
        count.textContent = `quantity ${value.countCoin}`;
        block.append(count);

        // plus.
        const minus = document.createElement('p');
        minus.classList.add('minus-coin');
        minus.textContent = '-----';
        block.append(minus);

        // minus.
        const plus = document.createElement('p');
        plus.classList.add('plus-coin');
        plus.textContent = '-----';
        block.append(plus);

        // button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('button-delete');
        deleteButton.textContent = 'DELETE';
        block.append(deleteButton);
    }
}   

// form.
function renderCoin() {
    const form = document.querySelector('#form');

    form.addEventListener('submit', (e) => {

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
            } else {
                alert('problem');
            }
        } 

        form.reset();

        
        PortfolioApp.renderPortfolio();
        PortfolioApp.remove();
    });

}
renderCoin();