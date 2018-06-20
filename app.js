const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const routes = require('./routes.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use('/static', express.static('static'));

routes(app);

const server = app.listen(3000, function () {
    console.log('app running on port.', server.address().port);
});