import { HStack, Text, Button, Flex, VStack,
    useColorModeValue, Input, FormControl, Radio, RadioGroup,
    Textarea, FormHelperText, FormErrorMessage, Divider,
    Select, Wrap, IconButton, Link, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Box, Image, Code
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useUser } from '@/providers/UserProvider'
import { CopyBlock } from 'react-code-blocks'
import { useSites } from '@/hooks/useSites';
import { useEditWebsite } from '@/hooks/useEditWebsite'
import { MdOutlineAdd, MdSave, MdDeleteOutline } from 'react-icons/md'
import { FaExternalLinkAlt, FaStar, FaTrash } from 'react-icons/fa'
import { GiCutDiamond } from 'react-icons/gi' 
import config from '@/config/index'

const EditWebsite = () => {
    const { currentEditWebsite, editWebsiteFormRef, isUpdating, isDeletingWebsite } = useWebsite();
    const { user } = useUser();
    const { CancelEdit, UpdateWebsite, DeleteWebsite, CopyWebsiteLink, UpgradeToPremium } = useSites();
    useEditWebsite();
    const { components: { title, unrevealedImage } } = currentEditWebsite;

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

    return (
        <VStack
            id='website-list'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='5px'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            h='100%'
            alignItems='flex-start'
        >
            <Flex flexDir='column' spacing='0' alignItems='flex-start'>
                <HStack justifyContent='space-between' w='full'>
                    <VStack spacing='0' alignItems='flex-start'>
                        <Text fontWeight='bold' fontSize='10pt'>
                            Edit Website
                        </Text>
                        <Text fontSize='10pt'>
                            Mint Website: <span style={{ color: 'rgb(52,140,212)' }}>{title}</span>
                        </Text>
                    </VStack>
                    <HStack>
                        <Input 
                            readOnly 
                            value={`${config?.frontendUrl}/${currentEditWebsite?._id}`} 
                            textAlign='center'
                            cursor='pointer' 
                            _hover={{ opacity: '.5' }} 
                            onClick={CopyWebsiteLink}
                            size='sm'
                        />
                        <Link href={`${config?.frontendUrl}/${currentEditWebsite?._id}`} isExternal>
                            <IconButton size='sm'>
                                <FaExternalLinkAlt />
                            </IconButton>
                        </Link>
                    </HStack>
                </HStack>
                <Box mt='1em'>
                    <form ref={editWebsiteFormRef}>  
                        <Wrap spacing='2em'>
                            <VStack alignItems='flex-start'>
                                <Image 
                                    src={unrevealedImage}
                                    alt='Unrevelead Image'
                                    objectFit='cover' 
                                    boxSize='200px'
                                    borderWidth='3px'
                                    borderStyle='dashed'
                                    borderRadius='10pt'
                                    p='1em'
                                />
                                <VStack alignItems='flex-start'>
                                    <Text fontSize='10pt' fontWeight='bold'>
                                        SEO Robot
                                    </Text>
                                    <Select id='robot' placeholder='Robot' size='sm'>
                                        <option value="if">index, follow</option>
                                        <option value="nf">noindex, follow</option>
                                        <option value="in">index, nofollow</option>
                                        <option value="nn">noindex, nofollow</option>
                                    </Select>
                                </VStack>
                                {!currentEditWebsite?.isPremium && (
                                    <Box w='200px'>
                                        <Button size='sm' variant='primary' w='full' leftIcon={<FaStar />} mt='1em' onClick={UpgradeToPremium} isLoading={isUpdating} loadingText='Updating'>
                                            Upgrade to Premium
                                        </Button>
                                        {user?.services?.website?.freeWebsite > 0 && (
                                            <Text fontSize='8pt' mt='.25em'>
                                                You have {user?.services?.website?.freeWebsite} Available Premium Website. Click to upgrade this mint website to premium.
                                            </Text>
                                        )}
                                    </Box>
                                )}
                            </VStack>
                            <VStack>
                                <HStack>
                                    <Input id='title' placeholder='Title' size='sm'/>
                                    <Select id='language' placeholder='Language' size='sm'>
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
                                </HStack>
                                <Input id='favicon' placeholder='Favicon Image Link' size='sm' />
                                <Input id='unrevealed' placeholder='Unrevealed Image Link' size='sm' />
                                <Textarea id='description' placeholder='Description' rows='5' size='sm' />
                                <Textarea id='script' placeholder='Script' rows='5' size='sm' />
                                <Textarea id='embed' placeholder='Embed' rows='5' size='sm' />
                            </VStack>
                        </Wrap>
                    </form>
                </Box>
                <HStack w='full' justifyContent='space-between' mt='1.5em'>
                    <Button variant='danger' size='sm' onClick={DeleteWebsite} isLoading={isDeletingWebsite} loadingText='Deleting' leftIcon={<FaTrash />}>
                        Delete
                    </Button>
                    <HStack mt='1em'>
                        <Button size='sm' onClick={CancelEdit} disabled={isUpdating}>
                            Cancel
                        </Button>
                        <Button variant='primary' rightIcon={<MdSave />} size='sm' onClick={UpdateWebsite} isLoading={isUpdating} loadingText='Updating'>
                            Save
                        </Button>
                    </HStack>
                </HStack>
            </Flex>
        </VStack>
    )
}

export default EditWebsite