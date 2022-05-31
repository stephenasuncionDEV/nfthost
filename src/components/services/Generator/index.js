import { Box, HStack, Text, Flex } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useGenerate } from '@/hooks/useGenerate'
import MetadataModal from './MetadataModal'
import Layers from './Layers'
import Toolbar from './Toolbar'
import style from '@/styles/Main.module.scss'

const Generator = () => {
    const { setIsMetadataModal } = useGenerator();
    const { onOpen, onSave } = useGenerate();

    return (
        <Box px='4em' pt='2em'>
            <HStack alignItems='flex-end' spacing='2em'>
                <Text variant='content_title'>
                    Collection Generator
                </Text>
                
            </HStack>
            <Box>
                <Flex 
                    p='1em' 
                    mt='1.5em' 
                    borderRadius='10px' 
                    minH='80vh' 
                    borderWidth='1px' 
                    className={style.blueprint}
                    justifyContent='space-between'
                >
                    <Layers />
                    <Toolbar />
                </Flex>
            </Box>
            <MetadataModal />
        </Box>
    )
}

export default Generator