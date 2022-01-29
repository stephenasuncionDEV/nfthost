import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import style from "../../../styles/Container.module.scss"

const LogsContainer = ({children}) => {
    const containerColor = useColorModeValue('rgb(255, 255, 255)', 'rgb(50, 55, 67)');
    
    return (
        <Box 
            maxWidth='1200px' 
            width='100%' 
            bg={containerColor} 
            borderRadius='5px'
            mt='6'
            p='5'
        >
            <Text fontSize='16pt'>Commits</Text>
            {children}
        </Box>
    )
}

export default LogsContainer