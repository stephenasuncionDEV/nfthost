import { Text, Flex, Button, VStack, useColorModeValue, Wrap, Image, HStack } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useUtils } from '@/hooks/useUtils'
import { utilsMenuArr } from '@/utils/json'
import ImageStorage from './ImageStorage'

const Utils = () => {
    const { utilsTab, setUtilsTab } = useGenerator();
    const {  } = useUtils();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

    return (
        <HStack alignItems='flex-start'>
            <VStack p='1em'>
                {utilsMenuArr?.map((menu, idx) => (
                    <Flex key={idx} w='300px'>
                        <Button 
                            bg='transparent' 
                            leftIcon={menu.icon}
                            justifyContent='flex-start' 
                            _hover={{ bg: 'whiteAlpha.100' }}
                            w='full'
                            color={utilsTab === menu.key ? '#348CD4' : 'white'}
                            onClick={() => setUtilsTab('image')}
                        >
                            {menu.title}
                        </Button>
                    </Flex>
                ))}
            </VStack>
            <Flex 
                flexDir='column'
                id='metadata'
                spacing='1.5em'
                p='1em' 
                bg={containerColor}
                borderRadius='.25em'
                boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
                alignItems='flex-start'
                w='full'
            >
                {utilsTab === 'image' && <ImageStorage />}
            </Flex>
        </HStack>
    )
}

export default Utils