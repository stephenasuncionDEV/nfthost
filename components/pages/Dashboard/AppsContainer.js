import { Box, Text, IconButton, useColorModeValue } from '@chakra-ui/react'
import { FaServer } from 'react-icons/fa'
import { GoCircuitBoard } from 'react-icons/go'
import style from "../../../styles/Container.module.scss"

const AppsContainer = ({onChange}) => {
    const containerColor = useColorModeValue('rgb(255, 255, 255)', 'rgb(50, 55, 67)');

    return (
        <Box 
            maxW='1000px' 
            w='100%' 
            bg={containerColor} 
            borderRadius='5px'
            mt='6'
            p='5'
        >
            <Text fontSize='16pt'>
                Your Applications
            </Text>
            <Box 
                mt='1'
            >
                <IconButton
                    aria-label='NFT Website Hosting'
                    size='lg'
                    icon={<FaServer size='24' />}
                    onClick={() => onChange(0)}
                />
                <IconButton
                    aria-label='NFT Generator'
                    size='lg'
                    icon={<GoCircuitBoard size='24' />}
                    ml='2'
                    onClick={() => onChange(1)}
                />
            </Box>
        </Box>
    )
}

export default AppsContainer