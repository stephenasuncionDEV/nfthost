import { useState, useEffect } from 'react'
import { VStack, Button, Flex, Text, useColorModeValue, HStack } from '@chakra-ui/react'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram'
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube'
import { SiTiktok } from '@react-icons/all-files/si/SiTiktok'
import { FaDiscord } from '@react-icons/all-files/fa/FaDiscord'
import { FaReddit } from '@react-icons/all-files/fa/FaReddit'
import { FaFacebook } from '@react-icons/all-files/fa/FaFacebook'
import { GiSailboat } from '@react-icons/all-files/gi/GiSailboat'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWebsiteControls } from '@/hooks/services/website/useWebsiteControls'
import DynamicInput from '@/components/DynamicInput'
import { webColor } from '@/theme/index'

const Design = () => {
    const { editingWebsite } = useWebsite();
    const { 
        updateFavicon,
        updateLogo,
        isUpdatingWebsite,
        editInputState,
        updateExternalLink
    } = useWebsiteControls();
    const [favicon, setFavicon] = useState('');
    const [logo, setLogo] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [discord, setDiscord] = useState('');
    const [reddit, setReddit] = useState('');
    const [facebook, setFacebook] = useState('');
    const [opensea, setOpensea] = useState('');

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    useEffect(() => {
        if (!editingWebsite) return;
        setFavicon(editingWebsite.meta.favicon);
        setLogo(editingWebsite.components.unrevealedImage);
        setTwitter(editingWebsite.externalLinks.twitter);
        setInstagram(editingWebsite.externalLinks.instagram);
        setYoutube(editingWebsite.externalLinks.youtube);
        setTiktok(editingWebsite.externalLinks.tiktok);
        setDiscord(editingWebsite.externalLinks.discord);
        setReddit(editingWebsite.externalLinks.reddit);
        setFacebook(editingWebsite.externalLinks.facebook);
        setOpensea(editingWebsite.externalLinks.opensea);
    }, [editingWebsite])

    return (
        <VStack mt='1em' flex='1' alignItems='flex-start' spacing='2em'>
            <Flex 
                flexDir='column' 
                bg={containerColor} 
                p='1em' 
                borderRadius='.25em' 
                maxW='865px' 
                w='full'
                border='1px solid rgb(117,63,229)'
                opacity={editingWebsite?.isExpired ? '.2' : '1'}
                pointerEvents={editingWebsite?.isExpired ? 'none' : 'all'}
            >
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Favicon URL</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            An external link to an Icon file representing your website. This will be displayed on your browser's tab.
                        </Text>
                    </VStack>
                    <DynamicInput 
                        id='favicon'
                        name='favicon'
                        type='text'
                        placeholder='Favicon URL'
                        value={favicon}
                        onChange={setFavicon}
                        isInvalid={editInputState?.favicon?.status}
                        errorText={editInputState?.favicon?.message}
                        mt='1em'
                        flex='1'
                    />
                </Flex>
                <Flex justifyContent='flex-end' mt='1em'>
                    <Button 
                        variant='primary' 
                        onClick={() => updateFavicon(favicon)}
                        disabled={editingWebsite?.isExpired || isUpdatingWebsite || !favicon.length || favicon === editingWebsite?.meta?.favicon}
                        isLoading={isUpdatingWebsite}
                        loadingText='Saving'
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
            <Flex 
                flexDir='column' 
                bg={containerColor} 
                p='1em' 
                borderRadius='.25em' 
                maxW='865px' 
                w='full'
                border='1px solid rgb(117,63,229)'
                opacity={editingWebsite?.isExpired ? '.2' : '1'}
                pointerEvents={editingWebsite?.isExpired ? 'none' : 'all'}
            >
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Logo URL</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            An external link to an Image file representing your website. This will be displayed on your browser's tab.
                        </Text>
                    </VStack>
                    <DynamicInput 
                        id='logo'
                        name='logo'
                        type='text'
                        placeholder='Logo URL'
                        value={logo}
                        onChange={setLogo}
                        isInvalid={editInputState?.logo?.status}
                        errorText={editInputState?.logo?.message}
                        mt='1em'
                        flex='1'
                    />
                </Flex>
                <Flex justifyContent='flex-end' mt='1em'>
                    <Button 
                        variant='primary' 
                        onClick={() => updateLogo(logo)}
                        disabled={editingWebsite?.isExpired || isUpdatingWebsite || !logo.length || logo === editingWebsite?.components?.unrevealedImage}
                        isLoading={isUpdatingWebsite}
                        loadingText='Saving'
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
            <Flex 
                flexDir='column' 
                bg={containerColor} 
                p='1em' 
                borderRadius='.25em' 
                maxW='865px' 
                w='full'
                border='1px solid rgb(117,63,229)'
                opacity={editingWebsite?.isExpired ? '.2' : '1'}
                pointerEvents={editingWebsite?.isExpired ? 'none' : 'all'}
            >
                <Flex flexDir='column'>
                    <VStack spacing='.25em' alignItems='flex-start'>
                        <Text>Social Media Links</Text>
                        <Text fontSize='10pt' variant='subtle'>
                            An external link to all your social medias. This will be displayed on the website.
                        </Text>
                    </VStack>
                    <VStack spacing='.5em' mt='1em'>
                        <HStack w='full'>
                            <FaTwitter />
                            <DynamicInput 
                                id='twitter'
                                name='twitter'
                                type='text'
                                placeholder='Twitter URL'
                                value={twitter}
                                onChange={setTwitter}
                                flex='1'
                            />
                            <Button 
                                variant='primary' 
                                onClick={() => updateExternalLink('twitter', twitter)}
                                disabled={editingWebsite?.isExpired || isUpdatingWebsite || twitter === editingWebsite?.externalLinks?.twitter}
                                isLoading={isUpdatingWebsite}
                                loadingText='Saving'
                            >
                                Save
                            </Button>
                        </HStack>
                        <HStack w='full'>
                            <GiSailboat />
                            <DynamicInput 
                                id='opensea'
                                name='opensea'
                                type='text'
                                placeholder='OpenSea URL'
                                value={opensea}
                                onChange={setOpensea}
                                flex='1'
                            />
                            <Button 
                                variant='primary' 
                                onClick={() => updateExternalLink('opensea', opensea)}
                                disabled={editingWebsite?.isExpired || isUpdatingWebsite || opensea === editingWebsite?.externalLinks?.opensea}
                                isLoading={isUpdatingWebsite}
                                loadingText='Saving'
                            >
                                Save
                            </Button>
                        </HStack>
                        <HStack w='full'>
                            <FaDiscord />
                            <DynamicInput 
                                id='discord'
                                name='discord'
                                type='text'
                                placeholder='Discord URL'
                                value={discord}
                                onChange={setDiscord}
                                flex='1'
                            />
                            <Button 
                                variant='primary' 
                                onClick={() => updateExternalLink('discord', discord)}
                                disabled={editingWebsite?.isExpired || isUpdatingWebsite || discord === editingWebsite?.externalLinks?.discord}
                                isLoading={isUpdatingWebsite}
                                loadingText='Saving'
                            >
                                Save
                            </Button>
                        </HStack>
                        <HStack w='full'>
                            <FaReddit />
                            <DynamicInput 
                                id='reddit'
                                name='reddit'
                                type='text'
                                placeholder='Reddit URL'
                                value={reddit}
                                onChange={setReddit}
                                flex='1'
                            />
                            <Button 
                                variant='primary' 
                                onClick={() => updateExternalLink('reddit', reddit)}
                                disabled={editingWebsite?.isExpired || isUpdatingWebsite || reddit === editingWebsite?.externalLinks?.reddit}
                                isLoading={isUpdatingWebsite}
                                loadingText='Saving'
                            >
                                Save
                            </Button>
                        </HStack>
                        <HStack w='full'>
                            <SiTiktok />
                            <DynamicInput 
                                id='tiktok'
                                name='tiktok'
                                type='text'
                                placeholder='Tiktok URL'
                                value={tiktok}
                                onChange={setTiktok}
                                flex='1'
                            />
                            <Button 
                                variant='primary' 
                                onClick={() => updateExternalLink('tiktok', tiktok)}
                                disabled={editingWebsite?.isExpired || isUpdatingWebsite || tiktok === editingWebsite?.externalLinks?.tiktok}
                                isLoading={isUpdatingWebsite}
                                loadingText='Saving'
                            >
                                Save
                            </Button>
                        </HStack>
                        <HStack w='full'>
                            <FaYoutube />
                            <DynamicInput 
                                id='youtube'
                                name='youtube'
                                type='text'
                                placeholder='Youtube URL'
                                value={youtube}
                                onChange={setYoutube}
                                flex='1'
                            />
                            <Button 
                                variant='primary' 
                                onClick={() => updateExternalLink('youtube', youtube)}
                                disabled={editingWebsite?.isExpired || isUpdatingWebsite || youtube === editingWebsite?.externalLinks?.youtube}
                                isLoading={isUpdatingWebsite}
                                loadingText='Saving'
                            >
                                Save
                            </Button>
                        </HStack>
                        <HStack w='full'>
                            <FaInstagram />
                            <DynamicInput 
                                id='instagram'
                                name='instagram'
                                type='text'
                                placeholder='Instagram URL'
                                value={instagram}
                                onChange={setInstagram}
                                flex='1'
                            />
                            <Button 
                                variant='primary' 
                                onClick={() => updateExternalLink('instagram', instagram)}
                                disabled={editingWebsite?.isExpired || isUpdatingWebsite || instagram === editingWebsite?.externalLinks?.instagram}
                                isLoading={isUpdatingWebsite}
                                loadingText='Saving'
                            >
                                Save
                            </Button>
                        </HStack>
                        <HStack w='full'>
                            <FaFacebook />
                            <DynamicInput 
                                id='facebook'
                                name='facebook'
                                type='text'
                                placeholder='Facebook URL'
                                value={facebook}
                                onChange={setFacebook}
                                flex='1'
                            />
                            <Button 
                                variant='primary' 
                                onClick={() => updateExternalLink('facebook', facebook)}
                                disabled={editingWebsite?.isExpired || isUpdatingWebsite || facebook === editingWebsite?.externalLinks?.facebook}
                                isLoading={isUpdatingWebsite}
                                loadingText='Saving'
                            >
                                Save
                            </Button>
                        </HStack>
                    </VStack>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default Design