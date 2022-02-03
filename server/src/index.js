
const express = require('express')
require('./database')
const app = express()
const cors = require('cors');
var bodyParser = require('body-parser')


const MongoClient = require('mongodb').MongoClient
let db;
let collection;
MongoClient.connect('mongodb://mongo/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    db = client.db('crud-express')
    collection= db.collection('tarea')
})





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

// app.get('/getToDos', (req, res) => {
//   console.log('Enviando tareas');
//   res.json(toDos)
// });

app.post('/addToDo', (req, res) => {
  console.log('Agregando tarea');
  console.log(req.body);
  collection.insertOne(req.body)
  res.status(201);
  res.send({ ok: true });
});


app.get('/getToDos', (req, res) => {
  db.collection('tarea').find().toArray()
    .then(results => {
      res.json(results);
    }).catch(error => console.error(error));
});

app.delete('/deleteToDo', (req, res) => {

  const { toDoId } = req.body;

  collection.deleteOne(
      { id: toDoId }
  )
      .then(result => {
          res.json('Deleted')
      })
      .catch(error => console.error(error))
});

// app.delete('/deleteToDo:id', (req, res) => {

//   console.log(req.body);
//   console.log('Eliminando tarea');
//   res.status(200);
//   res.send({ ok: true });
// })
/**
 * 
 * 
 * app.put('/product/:id', (req, res) => {
    collection.findOneAndUpdate(
        { name: req.params.id },
        {
            $set: {
                name: req.body.name,
                price: req.body.price
            }
        },
        {
            upsert: true
        }
    ).then(result => { res.json('Updated') })
        .catch(error => console.error(error))
});
 * 
 */
app.put('/updateToDo', (req, res) => {
  console.log('Actualizando tarea');
  console.log(req.body);

  const { body:toDo} = req;
  collection.findOneAndUpdate(
      { id: toDo.id },
      {
          $set: {
              done:!toDo.done
            }
      },
      {
          upsert: true
      }
  ).then(result => { res.json('Updated') })
      .catch(error => console.error(error))
});
/*app.put('/updateToDo', (req, res) => {


  console.log('Actualizando tarea');
  console.log(req.body);
  res.status(200);
  res.send({ ok: true });
})*/

app.listen(5000);
console.log('server oks');
