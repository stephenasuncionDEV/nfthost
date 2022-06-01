import { Box, HStack, Text, Avatar, useColorModeValue, Wrap } from '@chakra-ui/react'
import MetadataModal from './MetadataModal'
import Layers from './Layers'
import Toolbar from './Toolbar'
import Assets from './Assets'

const Generator = () => {

    const blueprintBGColor = useColorModeValue('rgb(238,238,238)', 'rgb(12,15,20)');
    const blueprintGridColor = useColorModeValue('linear-gradient(rgba(255,255,255,.5) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.5) 2px, transparent 2px), linear-gradient(rgba(255,255,255,.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.28) 1px, transparent 1px)', 'linear-gradient(rgba(0,0,0,.5) 2px, transparent 2px), linear-gradient(90deg, rgba(0,0,0,.5) 2px, transparent 2px), linear-gradient(rgba(0,0,0,.28) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.28) 1px, transparent 1px)');
    const blueprintBorderColor = useColorModeValue('whiteAlpha.300', 'black');
    const blueprintSponsorColor = useColorModeValue('black', 'white');

    return (
        <Box 
            minH='100vh'
            position='relative'
            p='1em'
            borderWidth='1px' 
            bgColor={blueprintBGColor}
            bgImage={blueprintGridColor}
            borderColor={blueprintBorderColor}
            backgroundSize='100px 100px, 100px 100px, 20px 20px, 20px 20px'
            backgroundPosition='-2px -2px, -2px -2px, -1px -1px, -1px '
        >
            <MetadataModal />
            <Toolbar />
            <Wrap spacing='1em' mt='1em'>
                <Layers />
                <Assets />
            </Wrap>
            <Box position='absolute' bottom='0' right='0' p='1em' opacity='.75'>
                <HStack>
                    <Text fontSize='12pt' color={blueprintSponsorColor}>
                        Powered by NFT Host
                    </Text>
                    <Avatar src='/logo.png' name='NFT Host Logo' bg='transparent' size='sm' />
                </HStack>
            </Box>
        </Box>
    )
}

export default Generator