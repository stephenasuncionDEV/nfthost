import { Box, Text, Button } from '@chakra-ui/react'
import { useMoralis } from "react-moralis"
import { MdCreate, MdWebAsset } from 'react-icons/md'

const WebsiteContainer = ({ onCreate, onClickHost }) => {
    const { user } = useMoralis();

    return (
        <Box 
            display='flex'
            flexWrap='wrap'
            mt='2'
            p='2'
            borderStyle='dashed'
            borderWidth='1px'
        >
            <Button
                aria-label='Create a new website'
                w='150px'
                h='140px'
                onClick={onCreate}
            >
                <MdCreate size='24' />
                <Text>Create</Text>
            </Button>
            {user.attributes.websites.map((host, idx) => (
                <Button
                    aria-label='Create a new website'
                    w='150px'
                    h='140px'
                    onClick={() => onClickHost(host)}
                >
                    <MdWebAsset size='24' />
                    <Text>{host.title.length > 11 ? host.title.substring(0, 7) + "..." : host.title}</Text>
                </Button>
            ))}
        </Box>
    )
}

export default WebsiteContainer