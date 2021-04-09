const express = require('express');
const Mongoose = require('mongoose');
const Item = require('./models/Item');
const git = require('git');
const app = express();
app.use(express.urlencoded({ extended: true }));
const mogno = 'mongodb+srv://aleemilyas:kingking123@cluster0.wo7wp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.set('view engine', 'ejs');

Mongoose.connect(mogno, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected');
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err)
    })
let a = [];

app.get('/', (req, res) => {
    res.redirect('/find-item')
})

app.get('/index', (req, res) => {
    res.redirect('/find-item');
})

app.get('/find-item', (req, res) => {
    Item.find().then(result => {
        res.render('index', { a: result })
    })
})

app.post('/add-data', (req, res) => {
    const item = new Item(req.body);
    item.save().then(res.redirect('/find-item')).catch(err => console.log(err))

})
app.get('/add-item', (req, res) => {
    res.render('add-item');
})
app.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    Item.findById(id).then(result => {
        res.render('item-detail', { item: result })
    }).catch(err => console.log(err))
})
app.delete('/detail/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    Item.findByIdAndDelete(id).then(result => {
        res.json({ redirect: '/' })
    }).catch(err => console.log(err))
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    Item.findByIdAndUpdate(id, req.body).then(result => {
        res.json({ value: 'Data Updated Successfully...' })
    }).catch(err => console.log(err))
})

app.use((req, res) => {
    res.render('404');
})