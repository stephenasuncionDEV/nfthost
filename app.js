const express = require("express")
const cors = require('cors')
const fs = require('fs')
const uniqid = require('uniqid'); 
const app = express();

const connection = require('./db/connection');
const { Log } = require('./models/Logs');

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post('/api/host', (req, res) => {
    const data = req.body;
    const id = uniqid();
    const content = `import style from "../styles/Host.module.scss"
    import { Typography } from "@mui/material";
    import MintContainer from "../components/MintContainer";
    import Header from "../components/Header"  
    const ${id} = () => {
        return (
            <div className={style.hostFrame}>
                <Header 
                    title="NFT Host"
                    keywords="NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum"
                />
                <div className={style.hostContainer}>
                    <img src="${data.image}" alt="NFT Host Logo" />
                    <Typography variant="h2" component="div">
                        ${data.title}
                    </Typography>
                    <Typography variant="body1">
                        ${data.description}
                    </Typography>
                    <MintContainer 
                        iframe="${data.iframe}"
                    />
                </div>
            </div>
        )
    }  
    export default ${id}`;

    //const url = req.protocol + '://' + req.get('host') + `/${id}`;
    const url = req.protocol + '://localhost:3000' + `/${id}`;

    fs.writeFile(`${__dirname}/pages/${id}.js`, content, err => {
        if (err) {
            res.status(400).json({message: err.message});
            return
        }
        res.status(200).json({url: url});
    })
});

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
        res.status(400).json(err);
    });
});

app.get('/api/webhook/get', (req, res) => {
    let length = 0;
    Log.find({}).count()
    .then(count => {
        length = count;
        return Log.find({}).limit(3).sort({ date : -1 });
    })
    .then(results => {
        const data = results.map((result, index) => ({
            ...result._doc,
            index: length - index
        }));
        res.json(data);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

connection.once('open', ()=>{
    console.log('Connected to db');
    const server = app.listen(process.env.PORT || 8080, ()=>{
        console.log('Listening on port 8080');
    });
});