import { useState } from "react"
import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import AppsContainer from "./AppsContainer"
import HostContainer from "./Hosting/HostContainer"
import GeneratorContainer from "./Generator/GeneratorContainer"

const Dashboard = () => {
    const [currentApp, setCurrentApp] = useState(0);
    const bg = useColorModeValue('rgb(255, 255, 255)', 'rgb(33, 37, 41)');

    const handleChangeApp = (index) => {
        setCurrentApp(index);
    }
    
    return (
        <div className="main-pane" style={{ backgroundColor: bg }}>
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