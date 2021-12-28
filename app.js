const express = require("express");
const app = express();

const connection = require('./db/connection');
const { Log } = require('./models/Logs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/api/webhook', (req, res) => {
    const data = req.body;
    let commitArr = [];
    data.commits.forEach((commit) => {
        commitArr.push(commit.message);
    });
    const newLog = {
        hash: data.head_commit.id,
        date: data.head_commit.timestamp,
        author: data.pusher.name,
        body: commitArr
    }
    const log = new Log(newLog);
    log.save()
    .then(response => {
        res.status(200).json({message: "Log successfully added"});
    })
    .catch(err => {
        console.log(err);
       // res.status(404).end({message: err.message})
    });
});

connection.once('open', ()=>{
    console.log('Connected to db');
    const server = app.listen(process.env.PORT || 8080, ()=>{
        console.log('Listening on port 8080');
    });
});