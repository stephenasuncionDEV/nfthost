import { useState, useEffect } from "react"
import { Box } from '@chakra-ui/react'
import { useMoralis } from "react-moralis"
import LayerDisplay from "./LayerDisplay"
import LayerContainer from "./LayersContainer"
import ProjectSettings from "./ProjectSettings"
import axios from "axios"

const GeneratorContainer = () => {
    const { account } = useMoralis();
    const [layerIndex, setLayerIndex] = useState(0);
    const [layerList, setLayerList] = useState([
        {
            name: "Layer 1",          
            images: []
        },
    ]);

    useEffect(() => {
        if (!account) return;
        const updateUser = async () => {
            try {
                const res = await axios.post("/api/user", {
                    address: account
                })
                console.log(account, res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        updateUser();
    }, [account])

    return (
        <Box
            display='flex'
            flexWrap='wrap'
            maxW='1000px'
            w='100%'
            alignItems='flex-start'
        >
            <Box
                maxW='684px'
                w='full'
                flexGrow='1'
                display='flex'
                flexDir='column'
            >
                <LayerDisplay
                    layerList={layerList} 
                    layerIndex={layerIndex}
                    setLayerList={setLayerList}
                />
                <ProjectSettings
                    layerList={layerList}
                />
            </Box>
            <LayerContainer 
                layerList={layerList} 
                layerIndex={layerIndex}
                setLayerList={setLayerList}
                setLayerIndex={setLayerIndex}
            />
        </Box>
    )
}

export default GeneratorContainer