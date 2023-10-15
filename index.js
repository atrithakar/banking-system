const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/DepositAndWithdraw');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connection Successful');
})

var response = new mongoose.Schema({
    holdername: String,
    deposit: Number
});
var account = mongoose.model('account', response);

const hostname = '127.0.0.1'
const port = 3000

app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.listen(port, hostname, () => {
    console.log(`Server started on http://${hostname}:${port}/`)
})

