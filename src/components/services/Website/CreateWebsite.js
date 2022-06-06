import { HStack, Text, Button, Flex, VStack,
    useColorModeValue, Input, FormControl, Radio, RadioGroup,
    Textarea, FormHelperText, FormErrorMessage, Divider,
    Select, Wrap, Tag, TagLeftIcon, Box
} from '@chakra-ui/react'
import { GiCutDiamond } from 'react-icons/gi'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useSites } from '@/hooks/useSites'
import { MdOutlineAdd, MdSave } from 'react-icons/md'

const CreateWebsite = () => {
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
        newMetaRobot,
        setNewMetaRobot,
        newMetaFavicon,
        setNewMetaFavicon,
        newMetaLanguage,
        setNewMetaLanguage,
        newErrors,
        isCreating,
        isUpdating,
        isEditWebsite,
        currentEditWebsite
    } = useWebsite();
    const { CreateWebsite, UpdateWebsite, clearFields } = useSites();
    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');

    return (
        <VStack 
            id='website-list'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='10px'
            boxShadow='md'
            h='100%'
            alignItems='flex-start'
            mt='1em'
            maxW='900px'
        >
            <Flex flexDir='column'>
                <Text variant='content_subtitle' mt='0'>
                    {!isEditWebsite ? 'Create Mint Website' : currentEditWebsite?.components?.title}
                </Text>
                <Text fontSize='10pt'>
                    {!isEditWebsite ? 'Create a Mint Website' : `Currently viewing: ${currentEditWebsite?.components?.title}`}
                </Text>
            </Flex>
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
                            <Input placeholder='Title' value={newComponentTitle} onChange={(e) => setNewComponentTitle(e.target.value)} />
                            {!newErrors?.title?.status ? <FormHelperText>Title you see in your browser's tab</FormHelperText> : <FormErrorMessage>{newErrors?.title?.message}</FormErrorMessage>}
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
                            {!newErrors?.language?.status ? <FormHelperText>Language of your website's content</FormHelperText> : <FormErrorMessage>{newErrors?.language?.message}</FormErrorMessage>}
                        </FormControl>
                    </Wrap>
                    <Wrap w='full'>
                        <FormControl isInvalid={newErrors?.favicon?.status} flex='1'>
                            <Input placeholder='Favicon Image Link' value={newMetaFavicon} onChange={(e) => setNewMetaFavicon(e.target.value)} />
                            {!newErrors?.favicon?.status ? <FormHelperText>External link of Icon in your browser's tab</FormHelperText> : <FormErrorMessage>{newErrors?.favicon?.message}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isInvalid={newErrors?.image?.status} flex='1'>
                            <Input placeholder='Unrevealed Image Link' value={newComponentImage} onChange={(e) => setNewComponentImage(e.target.value)} />
                            {!newErrors?.image?.status ? <FormHelperText>External link of unrevealed image of your nft collection</FormHelperText> : <FormErrorMessage>{newErrors?.image?.message}</FormErrorMessage>}
                        </FormControl>
                    </Wrap>
                    <FormControl isInvalid={newErrors?.description?.status}>
                        <Textarea placeholder='Description' value={newComponentDescription} onChange={(e) => setNewComponentDescription(e.target.value)} rows='8' />
                        {!newErrors?.description?.status ? <FormHelperText>Short description of your mint website</FormHelperText> : <FormErrorMessage>{newErrors?.description?.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={newErrors?.embed?.status}>
                        <Textarea placeholder='Embed' value={newComponentEmbed} onChange={(e) => setNewComponentEmbed(e.target.value)} rows='8' />
                        {!newErrors?.embed?.status ? <FormHelperText>Embed code of a Thirdparty website</FormHelperText> : <FormErrorMessage>{newErrors?.embed?.message}</FormErrorMessage>}
                    </FormControl>
                    <Wrap w='full'>
                        <FormControl isInvalid={newErrors?.robot?.status} flex='1'>
                            <Text mb='.5em'>
                                SEO Robot
                            </Text>
                            <RadioGroup onChange={setNewMetaRobot} value={newMetaRobot}>
                                <VStack alignItems='flex-start'>
                                    <Radio value='if'>index, follow</Radio>
                                    <Radio value='nf'>noindex, follow</Radio>
                                    <Radio value='in'>index, nofollow</Radio>
                                    <Radio value='nn'>noindex, nofollow</Radio>
                                </VStack>
                            </RadioGroup>
                            {!newErrors?.robot?.status ? <FormHelperText>Tells search engines what to follow and what not to follow</FormHelperText> : <FormErrorMessage>{newErrors?.robot?.message}</FormErrorMessage>}
                        </FormControl>
                        <Flex justifyContent='flex-end' flex='1'>
                            <VStack alignItems='flex-start'>
                                <Text mb='.5em'>
                                    Subscription
                                </Text>
                                <RadioGroup onChange={setNewSubscription} value={newSubcription}>
                                    <VStack alignItems='flex-start'>
                                        <Radio value='free'>Free</Radio>
                                        <VStack p='.5em' bg={containerColor} borderRadius='10px' alignItems='flex-start' pr='1em'>
                                            <Radio value='premium'>
                                                <HStack>
                                                    <GiCutDiamond color='orange' />
                                                    <Text color='yellow.500'>
                                                        Premium
                                                    </Text>
                                                </HStack>
                                            </Radio>
                                            <Flex flexDir='column' fontSize='10pt' pl='2em'>
                                                <Text>- Website Editor</Text>
                                                <Text>- No Watermark</Text>
                                            </Flex>
                                        </VStack>
                                    </VStack>
                                </RadioGroup>
                            </VStack>
                        </Flex>
                    </Wrap>
                </VStack>
                <HStack mt='2em' justifyContent='flex-end' w='full'>
                    {isEditWebsite ? (
                        <>
                        <Button size='lg' onClick={clearFields}>
                            Cancel
                        </Button>
                        <Button rightIcon={<MdSave />} size='lg' onClick={UpdateWebsite} disabled={isUpdating}>
                            Save
                        </Button>
                        </>
                    ) : (
                        <Button rightIcon={<MdOutlineAdd />} size='lg' onClick={CreateWebsite} disabled={isCreating}>
                            Create
                        </Button>
                    )}
                </HStack>
            </Flex>
        </VStack>
    )
}

export default CreateWebsite