const express = require('express')
const app = express()
const mongoose = require('mongoose')

let currentCustomer = undefined

mongoose.connect('mongodb://127.0.0.1:27017/BankingSystem');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connection Successful');
})

const response = new mongoose.Schema({
    holdername: String,
    accbalance: Number
});
const customer = mongoose.model('customer', response);

const hostname = '127.0.0.1'
const port = 3000

app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.get('/createacc',(req,res)=>{
    res.sendFile(__dirname+'/createacc.html')
})
app.get('/deleteacc',(req,res)=>{
    res.sendFile(__dirname+'/deleteacc.html')
})
app.get('/deposit',(req,res)=>{
    res.sendFile(__dirname+'/deposit.html')
})
app.get('/withdraw',(req,res)=>{
    res.sendFile(__dirname+'/withdraw.html')
})
app.get('/transfermoney',(req,res)=>{
    res.sendFile(__dirname+'/transfermoney.html')
})

app.post('/createacc',(req,res)=>{
    let mydata = new customer(req.body)
    mydata.save().then(()=>{
        res.sendFile(__dirname+'/createacc.html')
        
    }).catch()
})
app.post('/deleteacc',(req,res)=>{
    res.sendFile(__dirname+'/deleteacc.html')
})
app.post('/deposit',(req,res)=>{
    res.sendFile(__dirname+'/deposit.html')
})
app.post('/withdraw',(req,res)=>{
    res.sendFile(__dirname+'/withdraw.html')
})
app.post('/transfermoney',(req,res)=>{
    res.sendFile(__dirname+'/transfermoney.html')
})



app.listen(port, hostname, () => {
    console.log(`Server started on http://${hostname}:${port}/`)
})

