import React, { useState, useEffect, useRef } from "react";
import { Typography } from '@mui/material';
import style from "../../../styles/Log.module.scss"

const Log = ({hash, date, author, body}) => {
    return (
        <div className={style.container}>
            <Typography variant="h5" component="div">
                {hash}
            </Typography>
            <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary" gutterBottom>
                {date} 
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                Published by: {author}
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