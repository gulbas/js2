class Goods {
    constructor(page) {
        this.url = 'http://localhost:3000/goods';
        this.page = page;
        this.goodsArray = [];
        this.cartArray = [];
    }

    getGoods(appDiv) {
        fetch(`${this.url}/?page=${this.page}`)
            .then(res => res.json())
            .then(res => {
                res.map((num) => {
                    this.goodsArray.push(num);
                });
                this.render(appDiv);
            })
    }

    init(appDiv) {
        this.getGoods(appDiv);
    }

    render(appDiv) {
        let parentDiv = document.getElementById(appDiv);

        this.goodsArray.map((good) => {
            const goodItem = document.createElement('div'),
                productId = document.createElement('span'),
                productName = document.createElement('span'),
                productColor = document.createElement('span'),
                productMaterial = document.createElement('span'),
                productPrice = document.createElement('span');

            goodItem.className = 'itemGood';
            goodItem.dataset.id =  good.id;

            productId.className = 'spanId';
            productId.innerHTML = `ID: ${good.id}`;
            goodItem.appendChild(productId);

            productName.className = 'spanName';
            productName.innerHTML = `Name: ${good.productName}`;
            goodItem.appendChild(productName);

            productColor.className = 'spanColor';
            productColor.innerHTML = `Color: ${good.color}`;
            goodItem.appendChild(productColor);

            productMaterial.className = 'spanMaterial';
            productMaterial.innerHTML = `Material: ${good.productMaterial}`;
            goodItem.appendChild(productMaterial);

            productPrice.className = 'spanPrice';
            productPrice.innerHTML = `Price: ${good.price}`;
            goodItem.appendChild(productPrice);

            parentDiv.appendChild(goodItem);
        })

    }
}

let goods = new Goods('2');
goods.init('app');