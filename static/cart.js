"use strict";

class Cart {
    constructor(div) {
        this.countGoods = 0;
        this.amount = 0;
        this.div = document.getElementById(div);
        this.cartItems = [];
        this.idGood = 0;
    }

    addGoodInCart(button) {
        button.addEventListener('click', () => {
            this.countGoods++;
            this.amount += +(button.parentElement.getAttribute('data-price'));
            // console.log(button.parentElement.getAttribute('data-id'));
            this.idGood = button.parentElement.getAttribute('data-id');
            this.find(goodsArray, this.idGood);
            this.refresh();
            // console.log(goodsArray.findIndex(val => val.id === this.idGood));
        });
    }

    find(array, value) {
        if (array.indexOf) { // если метод существует
            return console.log(array.indexOf(value));
        }
    }

    render() {
        const divCart = this.div,
            title = document.createElement('h1'),
            amount = document.createElement('p'),
            countGoods = document.createElement('p');

        title.innerText = 'Корзина';
        amount.innerHTML = `Общаяя стоимость: ${this.amount}</p>`;
        countGoods.innerHTML = `Всего товаров: ${this.countGoods}`;


        divCart.appendChild(title);
        divCart.appendChild(countGoods);
        divCart.appendChild(amount);

    }

    refresh() {
        this.div.innerHTML = '';
        this.render();
    }
}