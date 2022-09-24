import { useState } from 'react'
import { VStack, Button, Flex, HStack, Text, Divider, Heading } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import General from './General'
import Domain from './Domain'
import { websiteSettingsArr } from '@/utils/json'

const Settings = () => {
    const { editingWebsite } = useWebsite();
    const [currentSettingsIdx, setCurrentSettingsIdx] = useState(0);

    return (
        <Flex flexDir='column' mt='1em' p='1em'>
            <HStack alignItems='center' w='full'>
                <Text fontSize='10pt'>
                    Website Settings
                </Text>
                <Divider flex='1' />
            </HStack>
            <Heading mt='1em' as='h2' fontSize='2em' fontWeight='500'>
                {editingWebsite?.components?.title}
            </Heading>
            <Flex mt='2em' gap='2em'>
                <VStack alignItems='flex-start' flex='1' maxW='255px' mt='1em'>
                    {websiteSettingsArr?.map((setting, idx) => (
                        <Button 
                            key={idx} 
                            bg='transparent' 
                            w='full' 
                            justifyContent='flex-start' 
                            fontSize='10pt'
                            onClick={() => setCurrentSettingsIdx(idx)}
                        >
                            {setting.name}
                        </Button>
                    ))}
                </VStack>
                <Flex flexDir='column' flex='1'>
                    <Text fontSize='16pt'>
                        {websiteSettingsArr[currentSettingsIdx]?.name}
                    </Text>
                    {{
                        general: <General />,
                        design: <General />,
                        domain: <Domain />,
                        advanced: <General />
                    }[websiteSettingsArr[currentSettingsIdx]?.name?.toLowerCase()]}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Settings