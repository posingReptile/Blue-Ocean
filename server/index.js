const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {get, add} = require('./controllers/first.js');

require('dotenv').config();
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('index.html'));

app.get('/get', get);
app.post('/add', add);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});