import { Box, Text } from '@chakra-ui/react'
import style from "../../../styles/Container.module.scss"

const LogsContainer = ({children}) => {
    return (
        <Box 
            maxWidth='1200px' 
            width='100%' 
            bg='white' 
            borderRadius='5px'
            mt='6'
            p='5'
            className={style.box}
        >
            <Text fontSize='16pt'>Commits</Text>
            {children}
        </Box>
    )
}

export default LogsContainer