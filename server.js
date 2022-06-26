const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const routes = require('./controllers/');
const path = require('path');
const sequelize = require('./config/connection');
const session  = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10,
        expiration: 1000 * 60 * 30
    })
}

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');