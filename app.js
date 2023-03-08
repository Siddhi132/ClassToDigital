require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const connectDB = require('./database/connect');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
const store = new mongoDBSession({
  uri: process.env.MONGO_URI,
  collection: 'ClassToDigital_sessions'
}); 

app.use(session({
  secret: "secret",
  saveUninitialized:false,
  resave: false,
  store: store
}));

// Set up routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));


// make pubblic folder static
app.use(express.static('public'));

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();