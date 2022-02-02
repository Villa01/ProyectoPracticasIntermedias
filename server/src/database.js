const mongoose= require('mongoose')
mongoose.connect('mongodb://mongo/mydatabase')
    .then (db=> console.log('suu base conectada'))
