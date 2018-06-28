"use strict";

import Goods from './script';

export default class GoodList {
    constructor() {
        this.render();
    }

    getGoodsList(url, container) {
        this.getApi(`${url}`)
            .then(res => {
                res.map(value => new Goods(value.id, value.productName, value.price, value.color, value.productMaterial))
                    .forEach(value => {
                        value.render(container)
                    })
            })
            .catch(e => container.textContent = e)
    }

    getApi(url) {
        return fetch(url).then(res => {
            if (res.status === 200) {
                return res;
            }
            throw new Error('Ошибка' + res);
        })
            .then(res => res.json())
    }

    render() {
        const goodContainer = document.getElementById('app');
        this.getGoodsList('api/goods', goodContainer);
    }
}

