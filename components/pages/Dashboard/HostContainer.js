import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, Button, Avatar, IconButton, TextField } from '@mui/material';
import WebsiteContainer from "./WebsiteContainer";
import style from "../../../styles/HostContainer.module.scss"

const HostContainer = ({alertRef}) => {
    const [isPreview, setIsPreview] = useState(false);
    const [hostImage, setHostImage] = useState("");
    const [hostTitle, setHostTitle] = useState("");
    const [hostHeader, setHostHeader] = useState("");
    const [hostDescription, setHostDescription] = useState("");
    const [hostList, setHostList] = useState([]);

    const onCreate = () => {
        if (hostImage.trim().length == 0 || hostTitle.trim().length == 0 || hostHeader.trim().length == 0 || hostDescription.trim().length == 0) {
            alertRef.current.handleOpen("error", "Please fill in all the required fields", 2000);
            return;
        }
        if (!isPreview) {
            const newHost = {
                title: hostTitle,
                header: hostHeader,
                description: hostDescription,
                image: hostImage
            }
            setHostList([...hostList, newHost]);
            onClear();
        }
        else {
            onClear();
            setIsPreview(false);
        }
    }

    const onClickHost = (host) => {
        setHostImage(host.image);
        setHostTitle(host.title);
        setHostHeader(host.header);
        setHostDescription(host.description);
        setIsPreview(true);
    }

    const onClear = () => {
        setHostImage("");
        setHostTitle("");
        setHostHeader("");
        setHostDescription("");
    }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setHostImage(URL.createObjectURL(img))
        }
    }

    const onTitleChange = (e) => {
        setHostTitle(e.target.value);
    }

    const onHeaderChange = (e) => {
        setHostHeader(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setHostDescription(e.target.value);
    }

    return (
        <Card className={style.card}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    NFT Host
                </Typography>
                <div className={style.container}>
                    <WebsiteContainer
                        hostList={hostList}
                        onCreate={onCreate}
                        onClickHost={onClickHost}
                    />
                    <div className={style.subContainer}>
                        <div className={style.hostInfoParent}>
                            <IconButton variant="outlined" component="label" className={style.imageUpload}>
                                {hostImage ? (
                                    <Avatar
                                        variant="rounded"
                                        alt="NFT Website Logo"
                                        src={hostImage}
                                        sx={{ width: 150, height: 150 }}
                                    />
                                ) : (
                                    "Upload Logo"
                                )}
                                <input type="file" accept="image/*" onChange={onImageChange} hidden />
                            </IconButton>
                            <div className={style.hostInfoContainer}>
                                <TextField required label="Title" variant="outlined" size="small" sx={{ width: "100%" }} value={hostTitle} onChange={onTitleChange}/>
                                <TextField required label="Header" variant="outlined" size="small" sx={{ width: "100%" }} value={hostHeader} onChange={onHeaderChange}/>
                                <TextField required label="Description" variant="outlined" size="small" sx={{ width: "100%" }} value={hostDescription} onChange={onDescriptionChange}/>
                            </div>
                        </div>
                        {isPreview && (
                            <div className={style.hostButtons}>
                                <Button variant="contained" sx={{ color: "black" }} onClick={onClear}>
                                    Clear
                                </Button>
                                <Button variant="contained" sx={{ ml: 1 }}>
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default HostContainer