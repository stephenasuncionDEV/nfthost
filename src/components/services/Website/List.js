import { HStack, Text, Button, VStack, IconButton,
    useColorModeValue, Image, Wrap, Tag, TagLeftIcon
} from '@chakra-ui/react'
import { MdRefresh, MdAdd } from 'react-icons/md'
import { GiCutDiamond } from 'react-icons/gi'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWebsiteControls } from '@/hooks/services/website/useWebsiteControls'
import { webColor } from '@/theme/index'

const List = ({ onCreateWebsiteOpen }) => {
    const { 
        websites, 
        isGettingWebsites, 
        editingWebsite 
    } = useWebsite();
    const { getWebsites } = useWebsiteControls();

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);
    const buttonColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
    const bgColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');
    const buttonDefaultColor = useColorModeValue('gray.100', 'whiteAlpha.200');

    return (
        <VStack
            alignItems='flex-start'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='5px'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            h='100%'
            w='full'
        >
            <HStack spacing='2em' justifyContent='space-between' w='full'>
                <VStack spacing='0' alignItems='flex-start'>
                    <Text fontWeight='bold' fontSize='10pt'>
                        Mint Websites
                    </Text>
                    <Text fontSize='10pt'>
                        List of mint websites you own
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
            <Wrap spacing='1.5em' p='1em' bg={bgColor} borderRadius='10px' w='full'>
                {websites?.map((website, idx) => (
                    <Button 
                        boxSize='180px'
                        position='relative' 
                        bgColor={buttonColor} 
                        cursor='pointer' 
                        borderRadius='10px'
                        key={idx}
                        overflow='hidden'
                        borderColor={editingWebsite?._id === website._id ? 'rgb(52,140,212)' : buttonDefaultColor}
                        borderBottomWidth='3px'
                    >
                        <Image 
                            position='absolute'
                            src={website?.components?.unrevealedImage}
                            alt='Website Logo' 
                            objectFit='cover' 
                            opacity='.1' 
                            boxSize='250px'
                        />
                        {website.isPremium && (
                            <Tag position='absolute' bottom='4'>
                                <TagLeftIcon as={GiCutDiamond} color='#08BDD4' />
                                <Text>
                                    Premium
                                </Text>
                            </Tag>
                        )}
                        <Text maxW='140px' noOfLines={1}>
                            {website.components.title}
                        </Text>
                    </Button>
                ))}
            </Wrap>
        </VStack>
    )
}

export default List