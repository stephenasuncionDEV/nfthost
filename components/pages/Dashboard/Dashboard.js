import { useState, useRef, useEffect } from "react"
import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { useMoralis } from "react-moralis"
import AppsContainer from "./AppsContainer"
import HostContainer from "./Hosting/HostContainer"
import GeneratorContainer from "./Generator/GeneratorContainer"
import ConfirmationDialog from "../../ConfirmationDialog"
import axios from "axios"

const Dashboard = () => {
    const { account } = useMoralis();
    const [currentApp, setCurrentApp] = useState(0);
    const confirmationDialogRef = useRef();
    const bg = useColorModeValue('rgb(255, 255, 255)', 'rgb(33, 37, 41)');

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

    const handleChangeApp = (index) => {
        if (localStorage.getItem("isRendering") === "true") {
            confirmationDialogRef.current.show({
                description: "Your NFT collection is currently rendering. Do you want to go to another page and lose all your work?",
                button: "Proceed",
                buttonColor: "blue",
                data: index
            });
            return;
        }
        onChangeApps(index);
    }

    const onChangeApps = (index) => {
        setCurrentApp(index);
        localStorage.setItem("isRendering", false);
    }

    return (
        <div className="main-pane" style={{ backgroundColor: bg }}>
            <ConfirmationDialog 
                ref={confirmationDialogRef}
                onConfirm={onChangeApps}
            />
            <Box
                display='flex'
                flexDir='column'
                h='full'
                alignItems='center'
                mt='6'
            >
                <Box 
                    maxWidth='1000px' 
                    width='100%'>
                    <Text fontSize='28pt'>Dashboard</Text>
                </Box>
                <AppsContainer onChange={handleChangeApp} />
                {currentApp == 0 && <HostContainer />}
                {currentApp == 1 && <GeneratorContainer />}
            </Box>
        </div>
    )
}

export default Dashboard