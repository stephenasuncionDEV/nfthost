import { useState } from "react"
import { Box, Text } from '@chakra-ui/react'
import AppsContainer from "./AppsContainer"
import HostContainer from "./HostContainer"
import GeneratorContainer from "./GeneratorContainer"

const Dashboard = () => {
    const [currentApp, setCurrentApp] = useState(0);

    return (
        <div className="main-pane">
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
                    <Text fontSize='28pt'>Dashboard 🔥</Text>
                </Box>
                <AppsContainer setCurrentApp={setCurrentApp} />
                {currentApp == 0 && <HostContainer />}
                {currentApp == 1 && <GeneratorContainer />}
            </Box>
        </div>
    )
}

export default Dashboard