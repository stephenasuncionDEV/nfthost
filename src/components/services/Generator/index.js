import { Box, HStack, Text, Flex, Avatar } from '@chakra-ui/react'
import MetadataModal from './MetadataModal'
import Layers from './Layers'
import Toolbar from './Toolbar'
import style from '@/styles/Main.module.scss'

const Generator = () => {

    return (
        <Box px='4em' pt='2em'>
            <Box>
                <Flex 
                    position='relative'
                    p='1em' 
                    mt='1.5em' 
                    borderRadius='10px' 
                    minH='80vh' 
                    borderWidth='1px' 
                    className={style.blueprint}
                    justifyContent='space-between'
                    flexWrap='wrap'
                >
                    <Layers />
                    <Toolbar />
                    <Box
                        position='absolute'
                        bottom='0'
                        right='0'
                        p='1em'
                    >
                        <HStack>
                            <Text fontSize='12pt' color='blackAlpha.500' fontFamily='consolas'>
                                Powered by NFT Host
                            </Text>
                            <Avatar src='/logo.png' name='NFT Host Logo' bg='transparent' size='sm' opacity='0.5' />
                        </HStack>
                    </Box>
                </Flex>
            </Box>
            <MetadataModal />
        </Box>
    )
}

export default Generator