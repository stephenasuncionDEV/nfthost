import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import LogsContainer from "./LogsContainer"
import Log from "./Log"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import MintContainer from "../../MintContainer";
import style from "../../../styles/Home.module.scss"

const Home = ({alertRef, userData}) => {
    const [logsData, setLogsData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/webhook/get")
        .then(res => {
            setLogsData(res.data);
        });
    }, [])

    return (
        <div>
            <div className="main-pane" style={{ height: "100vh" }}>
                <div className="host-frame">
                    <div className={style.container}>
                        <div className={style.headerContainer}>
                            <h1>Home 🏠</h1>
                        </div>
                        <div className={style.subContainer}>
                            <LogsContainer>
                                {logsData.map((log, idx) => (
                                    <Log index={log.index} hash={log.hash} date={log.date} author={log.author} body={log.body} key={idx} />
                                ))}
                            </LogsContainer>
                        </div>
                        <div className={style.previewHeader}>
                            <Typography variant="h5" component="div">
                                Check out our new collection
                            </Typography>
                            <KeyboardDoubleArrowDownIcon sx={{ fontSize: "24pt" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.hostContainer}>
                <img src="/logo.png" alt="NFT Host Logo" />
                <Typography variant="h2" component="div">
                    Kalabaw NFT
                </Typography>
                <Typography variant="body1">
                    Kalabaw NFT is a collection of 200 unique carabaos/water buffalos NFTs.
                </Typography>
                <MintContainer 
                    iframe='<iframe
                        src="https://cloudflare-ipfs.com/ipfs/bafybeigpfbnasq3sbciukilnculoy3cd24ov5mshzmuw7gregexdy223be?contract=0xce240737302120e7C61334fFec8DF254B7003703&chainId=4"
                        width="400px"
                        height="400px"
                        style="max-width:100%;"
                        frameborder="0"
                    />'
                />
            </div>
        </div>
    )
}

export default Home