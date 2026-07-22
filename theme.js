'use strict';

// status theme.
let statusTheme = false;

// function for change theme in a website
const changeTheme = function() {

    // change theme.
    statusTheme = true;

    // change button.
    const button = document.querySelector('.theme-block');
    
    button.addEventListener('click', () => {

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
    })

};

changeTheme();