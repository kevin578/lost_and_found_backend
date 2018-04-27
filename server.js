const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, id");
    next();
  });


//database stuff

mongoose.connect('mongodb://kevin:password@ds139919.mlab.com:39919/lost_and_found')
mongoose.connection.on('connected', ()=> {
    console.log('Mongoose is connected')
})

const schema = mongoose.Schema({
    item: String,
    description: String
})

const Item = mongoose.model('item', schema);



app.get('/', (req, res)=> {
    res.send('hello')
})


app.post('/api/additem', (req,res)=> {
    new Item({
        item: req.body.itemName,
        description: req.body.itemDescription
    })
    .save()
    .then(()=> {
        res.send('Go back');
    });
})

app.get('/api/getItems', (req,res)=> {
    Item.find({},(err, items)=>{
        res.json(items)
    })
}) 

app.delete('/api/deleteItem/', (req,res) => {
    Item.remove({ _id: req.headers.id }, ()=> res.send('Deleted'))
});




app.listen(port, () => console.log(`Listening on port ${port}`))



