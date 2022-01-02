import React, { useState, useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";
import { useMoralis } from "react-moralis";
import { Card, CardContent, Typography, Button, Avatar, IconButton, TextField, Paper, FormControlLabel, Checkbox } from '@mui/material';
import Chip from '@material-ui/core/Chip';
import WebsiteContainer from "./WebsiteContainer";
import style from "../../../styles/HostContainer.module.scss"
import UploadImageDialog from "./UploadImageDialog";
import PaymentDialog from "./PaymentDialog";
import axios from "axios";

const HostContainer = ({alertRef}) => {
    const { user, setUserData } = useMoralis();
    const [isPreview, setIsPreview] = useState(false);
    const [hostIndex, setHostIndex] = useState(null);
    const [hostURL, setHostURL] = useState("");
    const [hostImage, setHostImage] = useState("");
    const [hostTitle, setHostTitle] = useState("");
    const [hostHeader, setHostHeader] = useState("");
    const [hostDescription, setHostDescription] = useState("");
    const [hostIframe, setHostIframe] = useState("");
    const [hostList, setHostList] = useState([]);
    const [hostKeywords, setHostKeywords] = useState("");
    const [hostIsRobot, setHostIsRobot] = useState(true);
    const [hostLanguage, setHostLanguage] = useState("");
    const [chipData, setChipData] = useState([
        "NFT Host",
        "Host NFTs",
        "Mint Website",
        "NFT Website Hosting",
        "Mint NFT Website Hosting",
        "Mint NFT",
        "NFT",
        "Mint",
        "Crypto Currency",
        "Crypto",
        "Ethereum",
    ]);
    const uploadImageRef = useRef();
    const paymentDialogRef = useRef();

    const getHostList = () => {
        if (user == null) return;
        const websiteArr = user.attributes.websites;
        setHostList(websiteArr);
    }

    const handleDelete = (index) => {
        let newChipData = [...chipData];
        newChipData.splice(index, 1);
        setChipData(newChipData);
    }

    useEffect(() => {
        if (user == null) return;
        getHostList();
    }, [user, setUserData])

    const onCreate = () => {
        if (isPreview) {
            onClear();
            setIsPreview(false);
            return;
        }

        const hostSize = user.attributes.hostSize;
        if (hostSize != null && hostList.length + 1 > hostSize) {
            paymentDialogRef.current.handleOpen("Buy Website Slot", "");
            //alertRef.current.handleOpen("error", `You can only have ${hostSize} website(s)`);
            return;
        }

        if (hostImage.trim().length == 0 || 
            hostTitle.trim().length == 0 || 
            hostHeader.trim().length == 0 || 
            hostDescription.trim().length == 0 || 
            hostIframe.trim().length == 0) {
            alertRef.current.handleOpen("error", "Please fill in all the required fields");
            return;
        }

        if (hostIframe.indexOf("iframe") == -1 || hostIframe.indexOf("src='https://cloudflare-ipfs.com/ipfs/") == -1) {
            alertRef.current.handleOpen("error", "You must use Thirdweb's iframe embed code");
            return;
        }

        let keywords = "";
        chipData.forEach((chip, idx) => {
            keywords += chip + (idx == chipData.length - 1 ? "" : ", ");
        });

        const newHost = {
            title: hostTitle,
            header: hostHeader,
            description: hostDescription,
            image: hostImage,
            iframe: hostIframe,
            url: "",
            keywords: keywords,
            isRobot: hostIsRobot,
            language: hostLanguage
        }

        const websiteArr = user.attributes.websites;
        if (websiteArr == null) {
            setUserData({
                websites: [newHost],
                hostSize: 1
            })
        }
        else {
            const uniqueValues = new Set(websiteArr.map(w => w.title));
            if (!uniqueValues.has(hostTitle)) {
                setUserData({
                    websites: [...websiteArr, newHost]
                })
                .then(res => {
                    return axios.post("http://localhost:8080/api/host", newHost)
                })
                .then(res => {
                    const accessToken = res.data.accessToken;
                    localStorage.setItem("accessToken", accessToken);
                    const data = jwt_decode(accessToken);
                    return onSaveURL(data.url);
                })
                .then(res => {
                    getHostList();
                    onClear();
                    alertRef.current.handleOpen("success", "Your mint website has been created");
                })
                .catch(err => {
                    alertRef.current.handleOpen("error", err.message);
                })
            }
            else {
                alertRef.current.handleOpen("error", "You cannot have duplicated websites", 2000);
                return;
            }
        }
    }

    const onSaveURL = (url) => {
        let newList = [];
        if (hostList.length == 0) {
            const newHost = {
                title: hostTitle,
                header: hostHeader,
                description: hostDescription,
                image: hostImage,
                iframe: hostIframe,
                url: url
            }
            newList = [newHost];
            setHostList([newHost]);
        }
        else {
            let newHostList = [...hostList];
            newHostList[hostIndex].url = url;
            newList = [newHostList];
            setHostList(newHostList);
        }

        return setUserData({
            websites: newList
        })
    }

    const onSaveChanges = () => {
        if (hostIndex == -1) {
            alertRef.current.handleOpen("error", "Please select a website");
            return;
        } 
        
        let newHostList = [...hostList];
        newHostList[hostIndex].title = hostTitle;
        newHostList[hostIndex].header = hostHeader;
        newHostList[hostIndex].description = hostDescription;
        newHostList[hostIndex].iframe = hostIframe;
        newHostList[hostIndex].image = hostImage;
        setHostList(newHostList);
        setUserData({
            websites: newHostList
        })
        .then(res => {
            alertRef.current.handleOpen("success", "Changes has been saved");
            onClear();
            setIsPreview(false);
        })
        .catch(err =>  {
            alertRef.current.handleOpen("error", err.message);
        })
    }

    const onClickHost = (host) => {
        getHostList();
        const index = hostList.findIndex(res => res.title == host.title);
        setHostImage(host.image);
        setHostTitle(host.title);
        setHostHeader(host.header);
        setHostDescription(host.description);
        setHostIframe(host.iframe);
        setHostURL(host.url);
        setHostIndex(index);
        setIsPreview(true);
    }

    const onClear = () => {
        setHostImage("");
        setHostTitle("");
        setHostHeader("");
        setHostDescription("");
        setHostIframe("");
        setHostLanguage("");
        setHostKeywords("");
        setHostURL("");
        setHostIsRobot(true);
    }

    const onImageUpload = () => {
        uploadImageRef.current.handleOpen();
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

    const onIframeChange = (e) => {
        setHostIframe(e.target.value.replaceAll('"', "'"));
    }

    const onLanguageChange = (e) => {
        setHostLanguage(e.target.value);
    }

    const onKeywordsChange = (e) => {
        setHostKeywords(e.target.value);
    }

    const onKeywordsEnter = (e) => {
        if (e.key === 'Enter') {
            if (hostKeywords.indexOf(",") != -1) {
                let chipArray = [];
                let currentWord = "";
                for (let i = 0; i < hostKeywords.length; i++) {
                    const currentChar = hostKeywords.charAt(i);
                    currentWord += hostKeywords.charAt(i);
                    if (currentChar == ',' || i == hostKeywords.length - 1) {
                        const word = currentWord.trim().replace(',', "");
                        if (!chipArray.includes(word) && !chipData.includes(word)) {
                            chipArray.push(word);
                        } else {
                            alertRef.current.handleOpen("error", `You already used "${word}" keyword`);
                        }
                        currentWord = "";
                    }
                }
                setChipData([...chipData, ...chipArray]);
            }
            else {
                const word = hostKeywords.trim();
                if (!chipData.includes(word)) {
                    setChipData([...chipData, word]);
                } else {
                    alertRef.current.handleOpen("error", `You already used "${word}" keyword`);
                }
            }
        }
    }

    const onDelete = () => {
        if (hostIndex == -1) {
            alertRef.current.handleOpen("error", "Please select a website");
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        const headers = {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        }

        axios.post("http://localhost:8080/api/host/delete", {
            url: hostList[hostIndex].url
        }, headers)
        .then(res => {
            let newHostList = [...hostList];
            newHostList.splice(hostIndex, 1);
            setHostList(newHostList);
            return setUserData({websites: newHostList})
        })
        .then(res => {
            alertRef.current.handleOpen("success", "Successfully deleted");
            onClear();
            setIsPreview(false);
        })
        .catch(err =>  {
            alertRef.current.handleOpen("error", err.message);
        })
    }

    const onCopyURL = () => {
        if (hostURL.length == 0) return;
        navigator.clipboard.writeText(hostList[hostIndex].url);
        alertRef.current.handleOpen("info", "Link has been copied.");
    }

    return (
        <Card className={style.card}>
            <UploadImageDialog 
                ref={uploadImageRef} 
                hostImage={hostImage} 
                setHostImage={setHostImage} 
            />
            <PaymentDialog 
                ref={paymentDialogRef}
                // onConfirm={}
            />
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
                            <IconButton variant="outlined" component="label" className={style.imageUpload} onClick={onImageUpload}>
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
                            </IconButton>
                            <div className={style.hostInfoContainer}>
                                <div className={style.hostTitleLink}>
                                    <TextField required label="Title" variant="outlined" size="small" sx={{ flexGrow: 1 }} autoComplete='off' value={hostTitle} onChange={onTitleChange}/>
                                    <TextField disabled label="Link" variant="outlined" size="small" sx={{ flexGrow: 1, ml: 1 }} autoComplete='off' value={hostURL} onClick={onCopyURL}/>
                                </div>
                                <TextField required label="Header" variant="outlined" size="small" sx={{ width: "100%" }} autoComplete='off' value={hostHeader} onChange={onHeaderChange}/>
                                <TextField required label="Description" variant="outlined" size="small" sx={{ width: "100%" }} autoComplete='off' value={hostDescription} onChange={onDescriptionChange}/>
                            </div>
                        </div>
                        <div className={style.hostIframe}>
                            <TextField required multiline rows={7} label="ThirdWeb IFrame Embed Code" variant="outlined" size="small" sx={{ width: "100%" }} autoComplete='off' value={hostIframe} onChange={onIframeChange} />
                        </div>
                        <Typography variant="h6" sx={{mt: 1, mb: 2}} gutterBottom>
                            Meta Tags
                        </Typography>
                        <div className={style.hostMetaContainer}>
                            <FormControlLabel sx={{mb:1}} control={<Checkbox checked={hostIsRobot} onChange={() => setHostIsRobot((prev) => !prev)}/>} label="Allow robots to index your website?" />
                            <div className={style.hostTitleLink}>
                                <TextField label="Language" variant="outlined" size="small" sx={{ flexGrow: 1 }} autoComplete='off' value={hostLanguage} onChange={onLanguageChange}/>
                                <TextField label="Keywords" variant="outlined" size="small" sx={{ flexGrow: 1, ml: 1 }} autoComplete='off' value={hostKeywords} onChange={onKeywordsChange} onKeyUp={onKeywordsEnter}/>
                            </div>
                            <Paper component="ul" className={style.hostKeywordContainer}>
                                {chipData.map((chip, idx) => (
                                    <li key={idx}>
                                        <Chip
                                            label={`${chip}`}
                                            onDelete={() => handleDelete(idx)}
                                            className={style.hostKeywordChip}
                                        />
                                    </li>   
                                ))}
                            </Paper>
                        </div>
                        {isPreview && (
                            <div>
                                <div className={style.hostButtons}>
                                    <Button variant="contained" color="error" onClick={onDelete}>
                                        Delete
                                    </Button>
                                    <div className={style.hostButtonRight}>
                                        <Button variant="contained" sx={{ color: "black" }} onClick={onClear}>
                                            Clear
                                        </Button>
                                        <Button variant="contained" sx={{ ml: 1 }} onClick={onSaveChanges}>
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default HostContainer