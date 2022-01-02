import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, List, ListItem, ListItemText, Avatar } from '@mui/material';
import style from "../../../styles/About.module.scss"

const About = () => {
    const onGithub = () => {
        window.open("https://github.com/stephenasuncionDEV");
    }
 
    return (
        <div className="main-pane">
            <div className={style.container}>
                <div className={style.headerContainer}>
                    <h1>About ❤️</h1>
                </div>
                <Card className={style.card}>
                    <CardContent className={style.cardContent}>
                        <Typography variant="h6" gutterBottom>
                            NFT Host
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            NFT Host is a website where you can host your ERC721 drops and generate your own NFT collections. Upload your nft collection(s) and share it with anyone.
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            This website is an open-source project. If you want to contribute, check out {
                                <a 
                                    href="https://github.com/stephenasuncionDEV/nfthost" 
                                    target="_blank" 
                                    style={{color: "rgb(66, 135, 245)"}}
                                >
                                    NFT Host Github Repository
                                </a>
                            }
                            .
                        </Typography>
                        <div className={style.horizontal} style={{justifyContent: "flex-end", marginTop: "2em"}}>
                            <div className={style.vertical} onClick={onGithub} style={{cursor: "pointer"}}>
                                <Typography variant="body2" sx={{color: "rgb(100,100,100)"}}>
                                    Founded by Stephen Asuncion
                                </Typography>
                                <Typography variant="body2" sx={{color: "rgb(100,100,100)"}}>
                                    A.K.A. Typedef
                                </Typography>
                            </div>
                            <Avatar 
                                alt="Founder of NFT Host"
                                src="/typedef.jpg"
                                sx={{ ml: 2 }}
                                onClick={onGithub}
                                style={{cursor: "pointer"}}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default About