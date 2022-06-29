import { HStack, Text, Button, VStack, 
    useColorModeValue, Image, Wrap, Tag, TagLeftIcon
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useSites } from '@/hooks/useSites'
import { MdRefresh } from 'react-icons/md'
import { GiCutDiamond } from 'react-icons/gi'

const Sites = () => {
    const { websites, isRefreshing } = useWebsite();
    const { GetWebsites, EditWebsite } = useSites();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');
    const buttonColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
    const bgColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');

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
                <Button size='sm' leftIcon={<MdRefresh fontSize='12pt' />} onClick={GetWebsites} disabled={isRefreshing}>
                    Refresh
                </Button>
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
                        onClick={() => EditWebsite(website)}
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

export default Sites