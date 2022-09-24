import { useState, useEffect } from 'react'
import { VStack, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWebsiteControls } from '@/hooks/services/website/useWebsiteControls'
import DynamicInput from '@/components/DynamicInput'
import { webColor } from '@/theme/index'

const General = () => {
    const { editingWebsite } = useWebsite();
    const { 
        updateTitle,
        updateDescription,
        updateLanguage,
        updateScript,
        updateEmbed,
        updateRobot,
        isUpdatingWebsite,
        editInputState
    } = useWebsiteControls();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [script, setScript] = useState('');
    const [embed, setEmbed] = useState('');
    const [robot, setRobot] = useState('');
    const [language, setLanguage] = useState('');

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    useEffect(() => {
        if (!editingWebsite) return;
        setTitle(editingWebsite.components.title);
        setDescription(editingWebsite.components.description);
        setScript(editingWebsite.components.script);
        setEmbed(editingWebsite.components.embed);
        setRobot(editingWebsite.meta.robot);
        setLanguage(editingWebsite.meta.language);
    }, [editingWebsite])

    return (
        <VStack alignItems='flex-start' mt='1em' flex='1' spacing='2em'>
            <Flex flexDir='column' bg={containerColor} p='1em' borderRadius='.25em' maxW='865px' w='full'>
                <Flex flexDir='column'>  
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Name</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            Used to identify your Project on the Dashboard and main heading that will displayed.
                        </Text>
                    </VStack>
                    <DynamicInput 
                        id='title'
                        name='title'
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={setTitle}
                        isInvalid={editInputState?.title?.status}
                        errorText={editInputState?.title?.message}
                        mt='1em'
                        flex='1'
                    />
                </Flex>
                <Flex justifyContent='flex-end' mt='1em'>
                    <Button 
                        variant='primary' 
                        onClick={() => updateTitle(editingWebsite._id, title)}
                        disabled={isUpdatingWebsite || !title.length || title === editingWebsite.components.title}
                        isLoading={isUpdatingWebsite}
                        loadingText='Saving'
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
            <Flex flexDir='column' bg={containerColor} p='1em' borderRadius='.25em' maxW='865px' w='full'>
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Description</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            Short description of your NFT Collection that will be displayed.
                        </Text>
                    </VStack>
                    <DynamicInput 
                        id='description'
                        name='description'
                        type='textarea'
                        placeholder='Description'
                        value={description}
                        onChange={setDescription}
                        rows={5}
                        isInvalid={editInputState?.description?.status}
                        errorText={editInputState?.description?.message}
                        mt='1em'
                    />
                </Flex>
                <Flex justifyContent='flex-end' mt='1em'>
                    <Button 
                        variant='primary' 
                        onClick={() => updateDescription(editingWebsite._id, description)}
                        disabled={isUpdatingWebsite || !description.length || description === editingWebsite.components.description}
                        isLoading={isUpdatingWebsite}
                        loadingText='Saving'
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
            <Flex flexDir='column' bg={containerColor} p='1em' borderRadius='.25em' maxW='865px' w='full'>
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Language</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            Language that your website content is written on.
                        </Text>
                    </VStack>
                    <DynamicInput 
                        id='language'
                        name='language'
                        type='language'
                        placeholder='Language'
                        value={language}
                        onChange={setLanguage}
                        mt='1em'
                    />
                </Flex>
                <Flex justifyContent='flex-end' mt='1em'>
                    <Button 
                        variant='primary' 
                        onClick={() => updateLanguage(editingWebsite._id, language)}
                        disabled={isUpdatingWebsite || !language.length || language === editingWebsite.meta.language}
                        isLoading={isUpdatingWebsite}
                        loadingText='Saving'
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
            <Flex flexDir='column' bg={containerColor} p='1em' borderRadius='.25em' maxW='865px' w='full'>
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Styles &amp; Scripts</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            Code to style and/or scripts to run your embed code.
                        </Text>
                    </VStack>
                    <DynamicInput 
                        id='script'
                        name='script'
                        type='textarea'
                        placeholder='Style or Script code'
                        value={script}
                        onChange={setScript}
                        rows={5}
                        isInvalid={editInputState?.script?.status}
                        errorText={editInputState?.script?.message}
                        mt='1em'
                    />
                </Flex>
                <Flex justifyContent='flex-end' mt='1em'>
                    <Button 
                        variant='primary' 
                        onClick={() => updateScript(editingWebsite._id, script)}
                        disabled={isUpdatingWebsite || !script.length || script === editingWebsite.components.script}
                        isLoading={isUpdatingWebsite}
                        loadingText='Saving'
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
            <Flex flexDir='column' bg={containerColor} p='1em' borderRadius='.25em' maxW='865px' w='full'>
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Embed</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            Embed code from third-party services that displays the mint button.
                        </Text>
                    </VStack>
                    <DynamicInput 
                        id='embed'
                        name='embed'
                        type='textarea'
                        placeholder='Embed code'
                        value={embed}
                        onChange={setEmbed}
                        rows={5}
                        isInvalid={editInputState?.embed?.status}
                        errorText={editInputState?.embed?.message}
                        mt='1em'
                    />
                </Flex>
                <Flex justifyContent='flex-end' mt='1em'>
                    <Button 
                        variant='primary' 
                        onClick={() => updateEmbed(editingWebsite._id, embed)}
                        disabled={isUpdatingWebsite || !embed.length || embed === editingWebsite.components.embed}
                        isLoading={isUpdatingWebsite}
                        loadingText='Saving'
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
            <Flex flexDir='column' bg={containerColor} p='1em' borderRadius='.25em' maxW='865px' w='full'>
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Robot</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            Tells search engines what to follow and what not to follow.
                        </Text>
                    </VStack>
                    <DynamicInput 
                        id='robot'
                        name='robot'
                        type='select'
                        placeholder='SEO Robot Configuration'
                        value={robot}
                        onChange={setRobot}
                        selectData={[
                            { value: 'if', text: 'index, follow' },
                            { value: 'nf', text: 'noindex, follow' },
                            { value: 'in', text: 'index, nofollow' },
                            { value: 'nn', text: 'noindex, nofollow' }
                        ]}
                        mt='1em'
                    />
                </Flex>
                <Flex justifyContent='flex-end' mt='1em'>
                    <Button 
                        variant='primary' 
                        onClick={() => updateRobot(editingWebsite._id, robot)}
                        disabled={isUpdatingWebsite || !robot.length || robot === editingWebsite.meta.robot}
                        isLoading={isUpdatingWebsite}
                        loadingText='Saving'
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default General