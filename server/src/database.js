const MongoClient = require('mongodb').MongoClient
let db;
let collection;
MongoClient.connect('mongodb://mongo/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    db = client.db('crud-express')
    collection= db.collection('tarea')
})