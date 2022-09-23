import { HStack, Text, Button, Flex, VStack,
    Input, FormControl, Radio, RadioGroup,
    Textarea, FormHelperText, FormErrorMessage, Divider,
    Select, Wrap, Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalFooter, ModalBody, ModalCloseButton, Box, useToast
} from '@chakra-ui/react'
import { GiCutDiamond } from 'react-icons/gi'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useSites } from '@/hooks/services/website/useSites'
import { MdOutlineAdd } from 'react-icons/md'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import ReCAPTCHA from 'react-google-recaptcha'
import config from '@/config/index'

const CreateWebsiteModal = () => {
    const toast = useToast();
    const {
        newSubcription,
        setNewSubscription,
        newComponentTitle,
        setNewComponentTitle,
        newComponentImage,
        setNewComponentImage,
        newComponentDescription,
        setNewComponentDescription,
        newComponentEmbed,
        setNewComponentEmbed,
        newComponentScript,
        setNewComponentScript,
        newMetaRobot,
        setNewMetaRobot,
        newMetaFavicon,
        setNewMetaFavicon,
        newMetaLanguage,
        setNewMetaLanguage,
        newErrors,
        isCreating,
        isCreateWebsiteModal,
        setIsCreateWebsiteModal,
        createWebsiteStep,
        setCreateWebsiteStep,
        recaptchaRef
    } = useWebsite();
    const { CreateWebsite } = useSites();

    const OnCreateWebsite = async () => {
        try {
            if (!recaptchaRef.current.getValue().length) throw new Error('Please verify that you are a human.');
            await CreateWebsite();
        }
        catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    return (
        <Modal isOpen={isCreateWebsiteModal} onClose={() => setIsCreateWebsiteModal(false)} isCentered size='3xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a Mint Website</ModalHeader>
                <ModalCloseButton />
                <ModalBody>             
                    {createWebsiteStep === 'information' && (
                        <Flex flexDir='column' alignItems='flex-start' w='full'>
                            <HStack w='full'>
                                <Text fontSize='10pt' >
                                    Website Information
                                </Text>
                                <Divider flex='1' />
                            </HStack>
                            <VStack spacing='.75em' w='full' alignItems='flex-start' mt='1em'>
                                <Wrap w='full'>
                                    <FormControl isInvalid={newErrors?.title?.status} flex='1'>
                                        <Input placeholder='Title*' value={newComponentTitle} onChange={(e) => setNewComponentTitle(e.target.value)} />
                                        {!newErrors?.title?.status ? <FormHelperText fontSize='9pt'>Title you see in your browser's tab</FormHelperText> : <FormErrorMessage fontSize='9pt'>{newErrors?.title?.message}</FormErrorMessage>}
                                    </FormControl>
                                    <FormControl isInvalid={newErrors?.language?.status} flex='1'>
                                        <Select placeholder='Language' value={newMetaLanguage} onChange={(e) => setNewMetaLanguage(e.target.value)}>
                                            <option value="AF">Afrikaans</option>
                                            <option value="SQ">Albanian</option>
                                            <option value="AR">Arabic</option>
                                            <option value="HY">Armenian</option>
                                            <option value="EU">Basque</option>
                                            <option value="BN">Bengali</option>
                                            <option value="BG">Bulgarian</option>
                                            <option value="CA">Catalan</option>
                                            <option value="KM">Cambodian</option>
                                            <option value="ZH">Chinese (Mandarin)</option>
                                            <option value="HR">Croatian</option>
                                            <option value="CS">Czech</option>
                                            <option value="DA">Danish</option>
                                            <option value="NL">Dutch</option>
                                            <option value="EN">English</option>
                                            <option value="ET">Estonian</option>
                                            <option value="FJ">Fiji</option>
                                            <option value="FI">Finnish</option>
                                            <option value="FR">French</option>
                                            <option value="KA">Georgian</option>
                                            <option value="DE">German</option>
                                            <option value="EL">Greek</option>
                                            <option value="GU">Gujarati</option>
                                            <option value="HE">Hebrew</option>
                                            <option value="HI">Hindi</option>
                                            <option value="HU">Hungarian</option>
                                            <option value="IS">Icelandic</option>
                                            <option value="ID">Indonesian</option>
                                            <option value="GA">Irish</option>
                                            <option value="IT">Italian</option>
                                            <option value="JA">Japanese</option>
                                            <option value="JW">Javanese</option>
                                            <option value="KO">Korean</option>
                                            <option value="LA">Latin</option>
                                            <option value="LV">Latvian</option>
                                            <option value="LT">Lithuanian</option>
                                            <option value="MK">Macedonian</option>
                                            <option value="MS">Malay</option>
                                            <option value="ML">Malayalam</option>
                                            <option value="MT">Maltese</option>
                                            <option value="MI">Maori</option>
                                            <option value="MR">Marathi</option>
                                            <option value="MN">Mongolian</option>
                                            <option value="NE">Nepali</option>
                                            <option value="NO">Norwegian</option>
                                            <option value="FA">Persian</option>
                                            <option value="PL">Polish</option>
                                            <option value="PT">Portuguese</option>
                                            <option value="PA">Punjabi</option>
                                            <option value="QU">Quechua</option>
                                            <option value="RO">Romanian</option>
                                            <option value="RU">Russian</option>
                                            <option value="SM">Samoan</option>
                                            <option value="SR">Serbian</option>
                                            <option value="SK">Slovak</option>
                                            <option value="SL">Slovenian</option>
                                            <option value="ES">Spanish</option>
                                            <option value="SW">Swahili</option>
                                            <option value="SV">Swedish </option>
                                            <option value="TA">Tamil</option>
                                            <option value="TT">Tatar</option>
                                            <option value="TE">Telugu</option>
                                            <option value="TH">Thai</option>
                                            <option value="BO">Tibetan</option>
                                            <option value="TO">Tonga</option>
                                            <option value="TR">Turkish</option>
                                            <option value="UK">Ukrainian</option>
                                            <option value="UR">Urdu</option>
                                            <option value="UZ">Uzbek</option>
                                            <option value="VI">Vietnamese</option>
                                            <option value="CY">Welsh</option>
                                            <option value="XH">Xhosa</option>
                                        </Select>
                                        {!newErrors?.language?.status ? <FormHelperText fontSize='9pt'>Language of your website's content</FormHelperText> : <FormErrorMessage fontSize='9pt'>{newErrors?.language?.message}</FormErrorMessage>}
                                    </FormControl>
                                </Wrap>
                                <Wrap w='full'>
                                    <FormControl isInvalid={newErrors?.favicon?.status} flex='1'>
                                        <Input placeholder='Favicon Image Link' value={newMetaFavicon} onChange={(e) => setNewMetaFavicon(e.target.value)} />
                                        {!newErrors?.favicon?.status ? <FormHelperText fontSize='9pt'>External link of Icon in your browser's tab</FormHelperText> : <FormErrorMessage fontSize='9pt'>{newErrors?.favicon?.message}</FormErrorMessage>}
                                    </FormControl>
                                    <FormControl isInvalid={newErrors?.image?.status} flex='1'>
                                        <Input placeholder='Unrevealed Image Link' value={newComponentImage} onChange={(e) => setNewComponentImage(e.target.value)} />
                                        {!newErrors?.image?.status ? <FormHelperText fontSize='9pt'>External link of logo of your nft collection</FormHelperText> : <FormErrorMessage fontSize='9pt'>{newErrors?.image?.message}</FormErrorMessage>}
                                    </FormControl>
                                </Wrap>
                                <FormControl isInvalid={newErrors?.description?.status}>
                                    <Textarea placeholder='Description*' value={newComponentDescription} onChange={(e) => setNewComponentDescription(e.target.value)} rows='5' />
                                    {!newErrors?.description?.status ? <FormHelperText fontSize='9pt'>Short description of your mint website</FormHelperText> : <FormErrorMessage fontSize='9pt'>{newErrors?.description?.message}</FormErrorMessage>}
                                </FormControl>
                            </VStack>
                        </Flex>
                    )}
                    {createWebsiteStep === 'settings' && (
                        <Flex flexDir='column' alignItems='flex-start' w='full'>
                            <HStack w='full'>
                                <Text fontSize='10pt' >
                                    Miscellaneous
                                </Text>
                                <Divider flex='1' />
                            </HStack>
                            <Wrap w='full' mt='1em'>
                                <FormControl isInvalid={newErrors?.script?.status} flex='1'>
                                    <Textarea placeholder='Script or Style' value={newComponentScript} onChange={(e) => setNewComponentScript(e.target.value)} rows='8' />
                                    {!newErrors?.script?.status ? <FormHelperText fontSize='9pt'>Script or Style code of a third-party website</FormHelperText> : <FormErrorMessage fontSize='9pt'>{newErrors?.script?.message}</FormErrorMessage>}
                                </FormControl>
                                <FormControl isInvalid={newErrors?.embed?.status} flex='1'>
                                    <Textarea placeholder='Embed*' value={newComponentEmbed} onChange={(e) => setNewComponentEmbed(e.target.value)} rows='8' />
                                    {!newErrors?.embed?.status ? <FormHelperText fontSize='9pt'>Embed code of a third-party website</FormHelperText> : <FormErrorMessage fontSize='9pt'>{newErrors?.embed?.message}</FormErrorMessage>}
                                </FormControl>
                            </Wrap>
                            <Wrap w='full' mt='2em'>
                                <FormControl isInvalid={newErrors?.robot?.status} flex='1'>
                                    <Text mb='1em' fontSize='10pt' fontWeight='bold'>
                                        SEO Robot
                                    </Text>
                                    <RadioGroup onChange={setNewMetaRobot} value={newMetaRobot}>
                                        <VStack alignItems='flex-start' >
                                            <Radio value='if'><Text fontSize='10pt'>index, follow</Text></Radio>
                                            <Radio value='nf'><Text fontSize='10pt'>noindex, follow</Text></Radio>
                                            <Radio value='in'><Text fontSize='10pt'>index, nofollow</Text></Radio>
                                            <Radio value='nn'><Text fontSize='10pt'>noindex, nofollow</Text></Radio>
                                        </VStack>
                                    </RadioGroup>
                                    {!newErrors?.robot?.status ? <FormHelperText fontSize='9pt'>Tells search engines what to follow and what not to follow</FormHelperText> : <FormErrorMessage fontSize='9pt'>{newErrors?.robot?.message}</FormErrorMessage>}
                                </FormControl>
                                <Flex justifyContent='flex-end' flex='1'>
                                    <VStack alignItems='flex-start'>
                                        <Text mb='1em' fontSize='10pt' fontWeight='bold'>
                                            Subscription
                                        </Text>
                                        <RadioGroup onChange={setNewSubscription} value={newSubcription}>
                                            <VStack alignItems='flex-start'>
                                                <Radio value='free'>
                                                    <Text fontSize='10pt'>Free</Text>
                                                </Radio>
                                                <VStack p='.5em' borderStyle='dashed' borderWidth='3px' borderRadius='10px' alignItems='flex-start' pr='1em'>
                                                    <Radio value='premium'>
                                                        <HStack>
                                                            <GiCutDiamond color='rgb(52,140,212)' />
                                                            <Text color='rgb(52,140,212)' fontSize='10pt' fontWeight='bold' boxShadow='md'>
                                                                Premium
                                                            </Text>
                                                        </HStack>
                                                    </Radio>
                                                    <Flex flexDir='column' fontSize='9pt' pl='2em'>
                                                        <Text>- Templates &#38; Addons</Text>
                                                        <Text>- No Watermark</Text>
                                                        <Text>- More...</Text>
                                                    </Flex>
                                                </VStack>
                                            </VStack>
                                        </RadioGroup>
                                    </VStack>
                                </Flex>
                            </Wrap>
                        </Flex>
                    )}
                </ModalBody>
                <ModalFooter>
                    {createWebsiteStep === 'information' && (
                        <Button size='sm' rightIcon={<AiOutlineArrowRight />} onClick={() => setCreateWebsiteStep('settings')}>
                            Next
                        </Button>
                    )}
                    {createWebsiteStep === 'settings' && (
                        <HStack w='full' justifyContent='space-between'>
                            <Button size='sm' leftIcon={<AiOutlineArrowLeft />} onClick={() => setCreateWebsiteStep('information')}>
                                Previous
                            </Button>
                            <HStack>
                                <Box>
                                    <ReCAPTCHA 
                                        ref={recaptchaRef} 
                                        sitekey={config?.recaptcha?.siteKey}
                                        onExpired={() => {
                                            toast({
                                                title: 'Error',
                                                description: 'ReCaptcha has expired',
                                                status: 'error',
                                                duration: 3000,
                                                isClosable: true,
                                                position: 'bottom-center'
                                            })
                                        }}
                                        onErrored={() => {
                                            toast({
                                                title: 'Error',
                                                description: 'ReCaptcha Network Issue',
                                                status: 'error',
                                                duration: 3000,
                                                isClosable: true,
                                                position: 'bottom-center'
                                            })
                                        }}
                                        style={{
                                            transform: 'scale(0.77)',
                                            transforOrigin: '0 0'
                                        }}
                                    />
                                </Box>
                                <Button 
                                    rightIcon={<MdOutlineAdd />} 
                                    onClick={OnCreateWebsite} 
                                    disabled={isCreating} 
                                    variant='primary'
                                    size='sm'
                                >
                                    Create
                                </Button>
                            </HStack>    
                        </HStack>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreateWebsiteModal