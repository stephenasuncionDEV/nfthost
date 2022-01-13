import { useState, useRef } from "react"
import { Box, Text } from '@chakra-ui/react'
import AppsContainer from "./AppsContainer"
import HostContainer from "./Hosting/HostContainer"
import GeneratorContainer from "./Generator/GeneratorContainer"
import ConfirmationDialog from "../../ConfirmationDialog"

const Dashboard = () => {
    const [currentApp, setCurrentApp] = useState(0);
    const confirmationDialogRef = useRef();

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
        <div className="main-pane">
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