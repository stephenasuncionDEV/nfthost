// Dependencies
const express = require("express");
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid'); 
const app = express();

// Database
const connection = require('./db/connection');
const { Log } = require('./models/Logs');

// Express Config
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Validations
const { HostValidator, HostValidatorDelete } = require('./utils/validator');
const { validationResult } = require('express-validator');

// Jwt
const { generateAccessToken, authenticateToken } = require('./utils/jwt');

app.post('/api/host', HostValidator, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {title, description, keywords, isRobot, language, image, iframe} = req.body;
    const id = uniqid();

    const content = `import style from "../styles/Host.module.scss"
    import { Typography } from "@mui/material";
    import MintContainer from "../components/MintContainer";
    import Header from "../components/Header"  
    const ${id} = () => {
        return (
            <div className={style.hostFrame}>
                <Header 
                    title="${title}"
                    description="${description}"
                    keywords="${keywords}"
                    robots={${isRobot}}
                    language="${language}"
                    image="${image}"
                />
                <div className={style.hostContainer}>
                    <img src="${image}" alt="NFT Host Logo" />
                    <Typography variant="h2" component="div">
                        ${title}
                    </Typography>
                    <Typography variant="body1">
                        ${description}
                    </Typography>
                    <MintContainer 
                        iframe="${iframe}"
                    />
                </div>
            </div>
        )
    }  
    export default ${id}`;

    //const url = req.protocol + '://' + req.get('host') + `/${id}`;
    const url = req.protocol + '://localhost:3000' + `/${id}`;

    fs.writeFile(path.join(__dirname + `/pages/${id}.js`), content, err => {
        if (err) {
            res.status(400).json({message: err.message});
        }
        const data = { url: url };
        const accessToken = generateAccessToken(data);
        res.json({ accessToken: accessToken });
    });
});

app.post('/api/host/delete', HostValidatorDelete, authenticateToken, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const url = req.body.url;
    const fileName = url.substring(url.lastIndexOf('/') + 1) + ".js";
    fs.unlink(path.join(__dirname + `/pages/${fileName}`), (err) => {
        if (err) {
            res.status(400).json({message: err.message});
        }
        res.status(200).json({message: "Succesfully deleted"});
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
        res.status(400).json({message: err.message});
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
        res.status(400).json({message: err.message});
    });
});

connection.once('open', ()=>{
    console.log('Connected to db');
    const server = app.listen(process.env.PORT || 8080, ()=>{
        console.log('Listening on port 8080');
    });
});