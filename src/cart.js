"use strict";

export default class Cart {
    constructor() {
        this.goodsCart = [];
        this.state = {
            count: 0,
            price: 0
        };
        this.render();
    }


    render() {
        const cartDiv = document.getElementById('cart_wrapper'),
            h1 = document.createElement('h1'),
            countP = document.createElement('p'),
            priceP = document.createElement('p');

        countP.className = 'count';
        priceP.className = 'price';
        h1.textContent = 'Корзина';
        countP.textContent = `Количество товара: ${this.state.count}`;
        priceP.innerHTML = `Цена товара: ${this.state.price}`;


        cartDiv.appendChild(h1);
        cartDiv.appendChild(countP);
        cartDiv.appendChild(priceP);
    }

    addGoods(good) {
        if (!this.goodsCart.some(value => value.id === good.id)) {
            this.goodsCart.push(good);
        }
        this.cartStorage(good.id);
        this.state.count++;
        this.state.price += +good.price;
        this.refresh();
    }

    refresh() {
        const cartDiv = document.getElementById('cart_wrapper');
        cartDiv.innerHTML = '';
        this.render();
    }

    cartStorage(id) {
        let result = null;
        fetch('/api/my-user', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                result = data;
                console.log(result.auth);
                if (result.auth === false) {
                    localStorage.setItem("cart", this.goodsCart);
                } else {
                    fetch('api/cart/0', {
                        method: 'POST',
                        body: JSON.stringify({
                            cart: id + 1
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
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

    }

}
