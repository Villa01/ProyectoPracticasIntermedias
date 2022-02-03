
const express = require('express')
require('./database')
const app = express()
const cors = require('cors');
var bodyParser = require('body-parser')


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

app.use(cors());

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

const toDos = [
  {
    id: 1,
    done: false,
    desc: 'Tarea numero 1'
  },
  {
    id: 2,
    done: false,
    desc: 'Tarea numero 2'
  },
  {
    id: 3,
    done: false,
    desc: 'Tarea numero 3'
  }
]

app.get('/getToDos', (req, res) => {
  console.log('Enviando tareas');
  res.json(toDos)
});

app.post('/addToDo', (req, res) => {
  console.log('Agregando tarea');
  console.log(req.body);
  res.status(201);
});

app.delete('/deleteToDo', (req, res )=> {
  console.log(req.body);
  console.log('Eliminando tarea');
  res.status(200);
})

app.put('/updateToDo', (req, res ) => {
  console.log('Actualizando tarea');
  console.log(req.body);
  res.status(200);
})

app.listen(5000);
console.log('server oks');
