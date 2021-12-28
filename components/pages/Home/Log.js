import React, { useState, useEffect, useRef } from "react";
import { Typography } from '@mui/material';
import style from "../../../styles/Log.module.scss"

const Log = ({version, date, body}) => {
    return (
        <div className={style.container}>
            <Typography variant="h5" component="div">
                Update v{version}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {date}
            </Typography>
            {body.map((content, idx) => (
                <Typography variant="body2" key={idx}>
                    - {content}
                </Typography>
            ))}
        </div>
    )
}

export default Log