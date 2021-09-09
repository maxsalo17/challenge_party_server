const express = require('express');
const bodyParser = require('body-parser');

const port = 7030;
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const securedApiRoutes = require('./presentation/http/routes/securedApiRoutes')
const sharedApiRoutes = require('./presentation/http/routes/sharedApiRoutes')
const userMiddlewares = require('./presentation/http/middlewares/userMiddlewares')

app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

app.use(cors());

app.use('/api',
    sharedApiRoutes,
    ...userMiddlewares,
    securedApiRoutes
)




server.listen(port, () => console.log(`API listening on port ${port}!`))

