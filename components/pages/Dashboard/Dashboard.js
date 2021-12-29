import React, { useState, useEffect, useRef } from "react";
import AppsContainer from "./AppsContainer"
import HostContainer from "./HostContainer";
import GeneratorContainer from "./GeneratorContainer"
import style from "../../../styles/Dashboard.module.scss"

const Dashboard = ({alertRef}) => {
    const [currentApp, setCurrentApp] = useState(0);

    return (
        <div className="main-pane">
            <div className={style.container}>
                <div className={style.headerContainer}>
                    <h1>Dashboard 🎲</h1>
                </div>
                <div className={style.subContainer}>
                    <AppsContainer setCurrentApp={setCurrentApp}/>
                </div>
                <div className={style.subContainer}>
                    {currentApp == 0 && (
                        <HostContainer alertRef={alertRef}/>
                    )}
                    {currentApp == 1 && (
                        <GeneratorContainer alertRef={alertRef}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard