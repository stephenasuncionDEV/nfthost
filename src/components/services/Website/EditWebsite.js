import { HStack, Text, Button, Flex, VStack, useColorModeValue, 
    Input, Textarea, Select, Wrap, IconButton, Link, Box, Image,
    FormControl
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useUser } from '@/providers/UserProvider'
import { useSites } from '@/hooks/useSites';
import { useEditWebsite } from '@/hooks/useEditWebsite'
import { MdSave } from 'react-icons/md'
import { FaExternalLinkAlt, FaStar, FaTrash } from 'react-icons/fa'
import config from '@/config/index'
import { useCore } from '@/providers/CoreProvider';

const EditWebsite = () => {
    const { setAreYouSureData, setIsAreYouSureModal } = useCore();
    const { currentEditWebsite, editWebsiteFormRef, isUpdating, isDeletingWebsite, editErrors } = useWebsite();
    const { user } = useUser();
    const { CancelEdit, UpdateWebsite, DeleteWebsite, CopyWebsiteLink, UpgradeToPremium, RenewWebsite } = useSites();
    useEditWebsite();
    const { components: { title, unrevealedImage }, premiumStartDate } = currentEditWebsite;
    const subscriptionStart = new Date(premiumStartDate);
    const subscriptionEnd = new Date(subscriptionStart?.setDate(subscriptionStart?.getDate() + 30))

    const componentColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');
    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

    const Copy = (value) => {
        navigator.clipboard.writeText(value);

        toast({
            title: 'Success',
            description: 'Metadata Sample has been copied to clipboard',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-center'
        })
    }

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
            flex='1'
            maxW='700px'
        >
            <Flex flexDir='column' spacing='0' alignItems='flex-start' w='full'>
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
                            value={`${config?.frontendUrl}/${currentEditWebsite?.custom?.alias?.length > 0 ? currentEditWebsite?.custom?.alias : currentEditWebsite?._id}`}
                            textAlign='center'
                            cursor='pointer' 
                            _hover={{ opacity: '.5' }} 
                            onClick={CopyWebsiteLink}
                            size='sm'
                        />
                        <Link href={`${config?.frontendUrl}/${currentEditWebsite?.custom?.alias?.length > 0 ? currentEditWebsite?.custom?.alias : currentEditWebsite?._id}`} isExternal>
                            <IconButton size='sm'>
                                <FaExternalLinkAlt />
                            </IconButton>
                        </Link>
                    </HStack>
                </HStack>
                <Flex flexDir='column' mt='1em' w='full'>
                    <form ref={editWebsiteFormRef} style={{ width: '100%' }}>  
                        <Wrap spacing='2em' w='full'>
                            <VStack alignItems='flex-start' maxW='200px' flex='1'>
                                <Image 
                                    src={unrevealedImage}
                                    alt='Unrevelead Image'
                                    objectFit='cover' 
                                    boxSize='200px'     
                                    borderRadius='10px'
                                    p='1em'
                                    bg={componentColor}
                                />
                                <VStack alignItems='flex-start'>
                                    <Text fontSize='10pt' fontWeight='bold'>
                                        SEO Robot
                                    </Text>
                                    <FormControl isInvalid={editErrors?.robot?.status}>
                                        <Select id='robot' placeholder='Robot' size='sm'>
                                            <option value="if">index, follow</option>
                                            <option value="nf">noindex, follow</option>
                                            <option value="in">index, nofollow</option>
                                            <option value="nn">noindex, nofollow</option>
                                        </Select>
                                    </FormControl>
                                </VStack>
                                {currentEditWebsite?.isExpired && (
                                    <Button size='sm' variant='primary' w='full' leftIcon={<FaStar />} mt='1em' onClick={RenewWebsite} isLoading={isUpdating}>
                                        Renew Website
                                    </Button>
                                )}
                                {!currentEditWebsite?.isPremium ? (
                                    <Box w='full'>
                                        <Button size='sm' variant='primary' maxW='200px' leftIcon={<FaStar />} mt='1em' onClick={UpgradeToPremium} isLoading={isUpdating}>
                                            Upgrade to Premium
                                        </Button>
                                        {user?.services?.website?.freeWebsite > 0 && (
                                            <Text fontSize='8pt' mt='.25em'>
                                                You have {user?.services?.website?.freeWebsite} Available Premium Website. Click to upgrade this mint website to premium.
                                            </Text>
                                        )}
                                    </Box>
                                ) : (
                                    <Box w='full'>
                                        <Text fontSize='8pt'>
                                            Expiration Date: <span style={{ color: 'rgb(52,140,212)' }}>{subscriptionEnd.toString()}</span>
                                        </Text>
                                    </Box>
                                )}
                            </VStack>
                            <VStack alignItems='flex-start' flex='1'>
                                <HStack w='full'>
                                    <FormControl isInvalid={editErrors?.title?.status} flex='1'>
                                        <Input id='title' placeholder='Title' size='sm'/>
                                    </FormControl>
                                    <FormControl isInvalid={editErrors?.language?.status} flex='1'>
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
                                    </FormControl>
                                </HStack>
                                <FormControl isInvalid={editErrors?.favicon?.status}>
                                    <Input id='favicon' placeholder='Favicon Image Link' size='sm' />
                                </FormControl>
                                <FormControl isInvalid={editErrors?.image?.status}>
                                    <Input id='unrevealed' placeholder='Logo Image Link' size='sm' />
                                </FormControl>
                                <FormControl isInvalid={editErrors?.description?.status}>
                                    <Textarea id='description' placeholder='Description' rows='5' size='sm' />
                                </FormControl>
                                <FormControl position='relative' p='1em' bg={componentColor} borderRadius='10px'>
                                    <Textarea id='script' placeholder='Script or Style' rows='8' size='sm' />
                                    <Button size='xs' variant='primarySmall' position='absolute' top='2' right='2' onClick={() => Copy(currentEditWebsite?.components?.script)}>
                                        COPY
                                    </Button>
                                </FormControl>
                                <FormControl isInvalid={editErrors?.embed?.status} position='relative' p='1em' bg={componentColor} borderRadius='10px'>
                                    <Textarea id='embed' placeholder='Embed' rows='8' size='sm' />
                                    <Button size='xs' variant='primarySmall' position='absolute' top='2' right='2' onClick={() => Copy(currentEditWebsite?.components?.embed)}>
                                        COPY
                                    </Button>
                                </FormControl>
                            </VStack>
                        </Wrap>
                    </form>
                </Flex>
                <HStack w='full' justifyContent='space-between' mt='1.5em'>
                    <Button variant='danger' size='sm' isLoading={isDeletingWebsite} loadingText='Deleting' leftIcon={<FaTrash />} onClick={() => {
                        setAreYouSureData({
                            item: 'website',
                            action: 'Delete',
                            icon: <FaTrash />,
                            button: 'danger',
                            callback: () => {
                                DeleteWebsite();
                            }
                        });
                        setIsAreYouSureModal(true);
                    }}>
                        Delete
                    </Button>
                    <HStack mt='1em'>
                        <Button size='sm' onClick={CancelEdit} disabled={isUpdating}>
                            Cancel
                        </Button>
                        <Button variant='primary' leftIcon={<MdSave />} size='sm' onClick={UpdateWebsite} isLoading={isUpdating} loadingText='Updating'>
                            Save
                        </Button>
                    </HStack>
                </HStack>
            </Flex>
        </VStack>
    )
}

export default EditWebsite