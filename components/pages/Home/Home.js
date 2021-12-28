import React, { useState, useEffect, useRef } from "react";
import LogsContainer from "./LogsContainer"
import Log from "./Log"
import style from "../../../styles/Home.module.scss"

const Home = ({alertRef, logs}) => {
    return (
        <div className="main-pane">
            <div className="host-frame">
                <div className={style.container}>
                    <div className={style.headerContainer}>
                        <h1>Home 🏠</h1>
                    </div>
                    <div className={style.subContainer}>
                        <LogsContainer>
                            <Log hash="0.0.2" date="December 30, 2021" author="StephenAsuncionDEV"
                                body={["test body", "test body2"]}
                            />
                            <Log hash="0.0.2" date="December 29, 2021" author="StephenAsuncionDEV"
                                body={["test body", "test body2"]}
                            />
                            <Log hash="0.0.1" date="December 28, 2021" author="StephenAsuncionDEV"
                                body={["test body", "test body2"]}
                            />
                        </LogsContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home