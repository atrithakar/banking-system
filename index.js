const express = require('express')
const app = express()
const mongoose = require('mongoose')

let currentCustomer = undefined
let beneficiary = undefined

const withdraw = async (holdername, value) => {
    await customer.updateOne({ holdername: holdername }, { $inc: { accbalance: -value } })

}
const deposit = async (holdername, value) => {
    await customer.updateOne({ holdername: holdername }, { $inc: { accbalance: value } })

}

const transfermoney = async (currentCustomer, beneficiary, value) => {
    await withdraw(currentCustomer.holdername, value)
    await deposit(beneficiary.holdername, value)
}

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
const myip = '192.168.43.236'

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})
app.get('/createacc', (req, res) => {
    res.sendFile(__dirname + '/createacc.html')
})
app.get('/deleteacc', (req, res) => {
    res.sendFile(__dirname + '/deleteacc.html')
})
app.get('/deposit', (req, res) => {
    res.sendFile(__dirname + '/deposit.html')
})
app.get('/withdraw', (req, res) => {
    res.sendFile(__dirname + '/withdraw.html')
})
app.get('/transfermoney', (req, res) => {
    res.sendFile(__dirname + '/transfermoney.html')
})
app.get('/accountdetails', (req, res) => {
    res.sendFile(__dirname + '/accountdetails.html')
})
app.get('/api/details', (req, res) => {

    res.json(currentCustomer)
})

app.post('/createacc', (req, res) => {
    let mydata = new customer(req.body)
    mydata.save().then(() => {
        res.sendFile(__dirname + '/index.html')
    }).catch()
    currentCustomer = mydata
    console.log(currentCustomer)
})
app.post('/deleteacc', async (req, res) => {
    try {
        if (currentCustomer.holdername === req.body.holdername) {
            await customer.deleteOne({ holdername: req.body.holdername })
            res.sendFile(__dirname + '/login.html')
        }
        else {
            res.sendFile(__dirname + '/index.html')
        }

    }
    catch {
    }
})
app.post('/deposit', (req, res) => {
    let money = req.body.accbalance
    deposit(currentCustomer.holdername, money)
    res.sendFile(__dirname + '/deposit.html')
})
app.post('/withdraw', (req, res) => {
    let money = req.body.accbalance
    withdraw(currentCustomer.holdername, money)
    res.sendFile(__dirname + '/withdraw.html')
})
app.post('/transfermoney', async (req, res) => {

    try {
        beneficiary = await customer.findOne({ holdername: req.body.holdername })
        if (beneficiary.holdername === req.body.holdername) {
            console.log(beneficiary)
            console.log(currentCustomer)
            transfermoney(currentCustomer, beneficiary, req.body.accbalance)
        }
    }
    catch {
        console.log("Beneficiay not found")
    }
    res.sendFile(__dirname + '/transfermoney.html')
})
app.post('/', async (req, res) => {
    try {
        currentCustomer = await customer.findOne({ holdername: req.body.holdername })
        if (currentCustomer.holdername === req.body.holdername) {
            res.sendFile(__dirname + '/' + 'index.html')
        }
        else {
            res.sendFile(__dirname + '/' + 'login.html')
        }
    }
    catch {
        res.sendFile(__dirname + '/' + 'login.html')
    }
    console.log(currentCustomer)
    res.sendFile(__dirname + '/index.html')
})

app.listen(port, myip, hostname, () => {
    console.log(`Server started on http://${hostname}:${port}/`)
})

