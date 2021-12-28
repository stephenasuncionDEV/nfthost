const express = require("express");
const app = express();

const connection = require('./db/connection');
const { logs } = require('./models/Logs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/api/webhook', (req, res) => {
    if (req.body) {
        console.log(req.body);
        res.status(200).json({message: "Webhook Received"});
    } else {
        res.status(404).end();
    }
});

connection.once('open', ()=>{
    console.log('Connected to db');
    const server = app.listen(process.env.PORT || 8080, ()=>{
        console.log('Listening on port 8080');
    });
});