import { HStack, Text, Button, VStack, IconButton, Center, Spinner,
    useColorModeValue, Wrap, Avatar, AvatarBadge, Flex, Box
} from '@chakra-ui/react'
import { MdRefresh, MdAdd } from 'react-icons/md'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWebsiteControls } from '@/hooks/services/website/useWebsiteControls'
import { webColor } from '@/theme/index'
import config from '@/config/index'

const List = ({ onCreateWebsiteOpen }) => {
    const { 
        websites, 
        isGettingWebsites
    } = useWebsite();
    const { getWebsites, editWebsite } = useWebsiteControls();

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    return (
        <VStack
            alignItems='flex-start'
            spacing='1.5em'
            p='1em' 
            borderRadius='5px'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            h='100%'
            w='full'
        >
            <HStack spacing='2em' justifyContent='space-between' w='full'>
                <VStack spacing='0' alignItems='flex-start'>
                    <Text fontWeight='bold' fontSize='10pt'>
                        Minting Websites
                    </Text>
                    <Text fontSize='10pt'>
                        List of your minting websites
                    </Text>
                </VStack>
                <HStack>
                    <Button 
                        leftIcon={<MdAdd />} 
                        color='white' 
                        variant='primary' 
                        size='sm'
                        onClick={onCreateWebsiteOpen}
                    >
                        Create Website
                    </Button>
                    <IconButton size='sm' onClick={getWebsites} disabled={isGettingWebsites}>
                        <MdRefresh fontSize='12pt' />
                    </IconButton>
                </HStack>
            </HStack>
            {!isGettingWebsites ? (
                <Wrap spacing='1.5em' w='full' overflow='visible'>  
                    {websites?.map((web, idx) => (
                        <Flex 
                            flexDir='column'
                            key={idx} 
                            w='380px'
                            h='210px'
                            bg={containerColor}
                            p='1.5em'
                            borderRadius='.25em'
                            cursor='pointer'
                            className='scaleAnimation'
                            onClick={() => {
                                editWebsite(web);
                            }}
                        >
                            <Flex flexDir='column' flex='1' w='full'>
                                <HStack spacing='1em'>
                                    <Avatar 
                                        src={web.components.unrevealedImage} 
                                        name={`${web.components.title}'s logo`} 
                                        bg='transparent'
                                        size='sm'
                                    >
                                        <AvatarBadge 
                                            boxSize='1em' 
                                            bg={web.isPublished ? 'green.500': 'red.500'} 
                                            borderColor='white' 
                                            borderWidth='1px' 
                                        />
                                    </Avatar>
                                    <Flex flexDir='column' alignItems='flex-start'>
                                        <Text fontWeight='bold'>
                                            {web.components.title}
                                        </Text>
                                        <Text fontSize='10pt' variant='subtle'>
                                            {`${config?.frontendUrl}/${web.custom.alias.length > 0 ? 
                                                web.custom.alias 
                                                : 
                                                web.route}
                                            `}
                                        </Text>
                                    </Flex>
                                </HStack>
                                <Box flex='1' w='full'>
                                    <Text 
                                        fontSize='10pt' 
                                        mt='2em' 
                                        noOfLines={3}
                                        textAlign='start'
                                    >
                                        {web.components.description}
                                    </Text>
                                </Box>
                            </Flex>
                            <Flex>
                                <Text fontSize='9pt' variant='subtle'>
                                    {Math.floor((new Date() - Date.parse(web.createdAt)) / 86400000).toString()}d ago
                                </Text>              
                            </Flex>
                        </Flex>
                    ))}
                </Wrap>
            ) : (
                <Center w='full' h='210px'>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='rgb(117,63,229)'
                        size='lg'
                    />
                </Center>
            )}
        </VStack>
    )
}

export default List