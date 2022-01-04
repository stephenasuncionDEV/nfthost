const { join, dirname } = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const { validationResult } = require('express-validator');
const { generateAccessToken } = require('../../middlewares/jwt');
const { NFTError } = require('../../middlewares/errorHandler');

exports.create = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) throw new NFTError("Validation Error", 400);

        const {title, description, keywords, isRobot, language, image, iframe} = req.body;
        const id = uniqid();
        const content = `import style from "../styles/Host.module.scss"
        import { Text } from "@chakra-ui/react"
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
                        <Text fontSize='32pt'>
                            ${title}
                        </Text>
                        <Text fontSize='14pt'>
                            ${description}
                        </Text>
                        <MintContainer 
                            iframe="${iframe}"
                        />
                    </div>
                </div>
            )
        }  
        export default ${id}`;

        const url = `https://nfthost.vercel.app/${id}`;

        fs.writeFile(join(dirname(require.main.filename), `/.output/server/pages/${id}.js`), content, err => {
            if (err) throw new NFTError(err.message, 400);
            const data = { url: url };
            const accessToken = generateAccessToken(data);
            res.json({ accessToken: accessToken });
        });

    } catch (err) {
        next(err);
    }
}

exports.delete = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) throw new NFTError("Validation Error", 400);

        const { url } = req.body;
        const fileName = url.substring(url.lastIndexOf('/') + 1);
        fs.unlink(join(dirname(require.main.filename), `/.output/server/pages/${fileName}.js`), (err) => {
            if (err) throw new NFTError(err.message, 400);
            res.sendStatus(200);
        })
    } catch (err) {
        next(err);
    }
}

exports.list = (req, res, next) => {
    try {
        fs.readdir(join(dirname(require.main.filename), '/.output/server/pages'), (err, files) => {
            if (err) throw new NFTError(err.message, 400);
            const files = files.map((file) => file);
            res.json({files: files})
        });
    } catch (err) {
        next (err)
    }
}