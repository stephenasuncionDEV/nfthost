const express = require("express");
const app = express();

const connection = require('./db/connection');
const { Log } = require('./models/Logs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/api/webhook', (req, res) => {
    console.log(req.body)
    // const newLog = {

    // }
    // const log = new Log(newLog);
    // log.save()
    // .then(res => {
    //     res.status(200).json({message: "Log successfully added"});
    // })
    // .catch(err => {
    //     res.status(404).end({message: err})
    // });
});

connection.once('open', ()=>{
    console.log('Connected to db');
    const server = app.listen(process.env.PORT || 8080, ()=>{
        console.log('Listening on port 8080');
    });
});