"use strict";
import Cart from "./cart";

const cart = new Cart();

export default class Goods {
    constructor(id, productName, price, color, productMaterial) {
        this.id = id;
        this.productName = productName;
        this.price = price;
        this.color = color;
        this.productMaterial = productMaterial;
    }

    render(container) {
        const goodItem = document.createElement('div'),
            productId = document.createElement('span'),
            productName = document.createElement('span'),
            productColor = document.createElement('span'),
            productMaterial = document.createElement('span'),
            productPrice = document.createElement('span'),
            button = document.createElement('button'),
            textButton = document.createTextNode("Add to card");

        goodItem.className = 'itemGood';
        goodItem.dataset.id = this.id;
        goodItem.dataset.price = this.price;

        productId.className = 'spanId';
        productId.innerHTML = `ID: ${this.id}`;
        goodItem.appendChild(productId);

        productName.className = 'spanName';
        productName.innerHTML = `Name: ${this.productName}`;
        goodItem.appendChild(productName);

        productColor.className = 'spanColor';
        productColor.innerHTML = `Color: ${this.color}`;
        goodItem.appendChild(productColor);

        productMaterial.className = 'spanMaterial';
        productMaterial.innerHTML = `Material: ${this.productMaterial}`;
        goodItem.appendChild(productMaterial);

        productPrice.className = 'spanPrice';
        productPrice.innerHTML = `Price: ${this.price}`;
        goodItem.appendChild(productPrice);

        button.setAttribute('id', 'button');

        button.appendChild(textButton);
        goodItem.appendChild(button);

        container.appendChild(goodItem);
        this.addEventListener(button);
    }

    addEventListener(button) {
        button.addEventListener('click', () => {
            cart.addGoods({
                id: this.id,
                productName: this.productName,
                price: this.price,
                color: this.color,
                productMaterial: this.productMaterial,
                count: 1
            });
        })
    }
}


