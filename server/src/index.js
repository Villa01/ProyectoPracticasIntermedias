
const express = require('express')
require('./database')
const app = express()
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS"
  );
  next();
});



app.get('/getToDos', (req, res) => {
  console.log('Peticion get');
  res.send("efeeedasdasdsadsadsadsda")
});

app.listen(5000);
console.log('server oks');
