"use strict";

class Cart {
    constructor(div) {
        this.countGoods = 0;
        this.amount = 0;
        this.div = document.getElementById(div);
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        this.idGood = 0;
    }

    addGoodInCart(button) {
        let result = null;
        button.addEventListener('click', () => {
            this.countGoods++;
            this.amount += +(button.parentElement.getAttribute('data-price'));

            this.idGood = +(button.parentElement.getAttribute('data-id'));
            let index = goodsArray.findIndex(val => val.id === this.idGood);

            this.cartItems.push(goodsArray[index]);

            fetch('/my-user', {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    result = data;
                    console.log(result.auth);
                    if (result.auth === false) {
                        localStorage.setItem('cart', JSON.stringify(this.cartItems));
                    } else {
                        fetch('/cart/0', {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            method: "POST",
                            body: JSON.stringify({
                                cart: this.idGood
                            }),
                        }).then(res => {
                            if (res.status === 200) {
                                return res;
                            }
                            throw new Error(res.statusText)
                        })
                            .then(res => res.json())
                            .then(data => console.log(data))
                            .catch(e => console.log(e));
                    }
                })
                .catch(e => console.log(e));


            this.refresh();
        });
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