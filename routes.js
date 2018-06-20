const faker = require('faker');

const checkIsNum = id => !isNaN(+id);
const send400 = (res, message) => res.status(400).send({ message });
const send404 = (res, message) => res.status(404).send({ message });

const itemsPerPage = 10;

const appRouter = function (app) {

  const goods = {};

  const users = {
    0: {
      name: faker.name.findName(),
      cart: [],
      id: 0,
    }
  }

  let i = 0;

  for (; i <= 20; i++) {
    goods[i] = ({
      id: i,
      productName: faker.commerce.productName(),
      price: faker.commerce.price(),
      color: faker.commerce.color(),
      productMaterial: faker.commerce.productMaterial()
    });
  }

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/my-user', function(req, res) {
    if (req.session.authorized) {
      const userId = req.session.userId;
      res.status(200).send({
        user: users[userId],
        auth: true,
      });
    } else {
      res.status(200).send({
        user: null,
        auth: false,
      });
    }
  });

  app.get('/login', function(req, res) {
    if (!req.session.authorized) {
      req.session.authorized = true;
      req.session.userId = users[0].id;
    }
    res.redirect('/');
  });

  app.get('/logout', function(req, res) {
    req.session.authorized = false;
    req.session.userId = false;

    res.redirect('/');
  });

  app.get('/goods', function (req, res) {
    const query = req.query;

    let result = Object.values(goods);
    let pages = 0;
    let currentPage = 0;

    if (query.color) {
      result = result.filter(e => e.color === query.color);
    }

    if (query.minprice) {
      result = result.filter(e => e.price >= query.minprice);
    }

    if (query.maxprice) {
      result = result.filter(e => e.price <= query.maxprice);
    }

    if (query.page) {
      pages = Math.ceil(result.length / 10);

      const stast = (query.page - 1) *  itemsPerPage;
      const end = query.page *  itemsPerPage;

      result = result.slice(stast, end);
    }

    res.status(200).send(result);
  });

  app.get('/menu', function (req, res) {
    res.status(200).send(['main', 'catalog', 'cart', 'user']);
  });

  app.get('/goods/:id',  function (req, res) {
    const id = req.params.id;

    if (checkIsNum(id)) {

      const goodie = goods[id];

      if (goodie) {
        res.status(200).send(goodie);
      } else {
        send404(res, 'goodie does not exist');
      }
    } else {
      send400(res, 'invalid id supplied');
    }
  });

  app.get('/users', function (req, res) {
    res.status(200).send(Object.values(users));
  });

  app.get('/users/:id', function(req, res) {
    const id = req.params.id;

    if (checkIsNum(id)) {
      const user = users[id];
      if (user) {
        res.status(200).send(user);
      } else {
        send404(res, 'user does not exist');
      }
    } else {
      send400(res, 'invalid id supplied');
    }
  })


  app.get('/cart/:id', function(req, res) {
    const id = req.params.id;

    if (checkIsNum(id)) {
      const user = users[id];
      if (user) {
        res.status(200).send(user.cart);
      } else {
        res.status(404).send({ message: 'user and cart do not exist' });
      }
    } else {
      send400(res, 'invalid id supplied');
    }
  })

  app.post('/cart/:id', function(req, res) {
    const id = req.params.id;
    const body = req.body;

    if (checkIsNum(+id)) {
      const user = users[id];
      if (user && body.cart) {
        user.cart.push(body.cart)

        res.status(200).send(user.cart);
      } else if (!body.cart) {
        send400(res, 'no item provided');
      } else {
        res.status(404).send({ message: 'user and cart do not exist' });
      }
    } else {
      send400(res, 'invalid id supplied');
    }
  })

  app.delete('/cart/:id', function(req, res) {
    const id = req.params.id;
    const body = req.body;

    if (checkIsNum(+id)) {
      const user = users[id];
      if (user && body.cart) {
        const index = user.cart.indexOf(body.cart);

        user.cart.splice(index, 1);

        if (index > -1) {
          res.status(200).send(user.cart);
        } else {
          send400(res, 'no item exist');
        }
      } else if (!body.cart) {
        send400(res, 'no item provided');
      } else {
        res.status(404).send({ message: 'user and cart do not exist' });
      }
    } else {
      send400(res, 'invalid id supplied');
    }
  })


}

module.exports = appRouter;