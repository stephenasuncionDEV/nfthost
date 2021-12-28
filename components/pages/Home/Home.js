import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import LogsContainer from "./LogsContainer"
import Log from "./Log"
import style from "../../../styles/Home.module.scss"

const Home = ({alertRef, logs}) => {
    const [logsData, setLogsData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/webhook/get")
        .then(res => {
            setLogsData(res.data);
        });
    }, [])

    return (
        <div className="main-pane">
            <div className="host-frame">
                <div className={style.container}>
                    <div className={style.headerContainer}>
                        <h1>Home 🏠</h1>
                    </div>
                    <div className={style.subContainer}>
                        <LogsContainer>
                            {logsData.map((log, idx) => (
                                <Log hash={log.hash} date={log.date} author={log.author} body={log.body} key={idx} />
                            ))}
                        </LogsContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home