import { HStack, Text, Flex, Button, VStack, 
    useColorModeValue, Image, Wrap, Tag, TagLeftIcon
} from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useSites } from '@/hooks/useSites'
import { MdRefresh } from 'react-icons/md'
import { GiCutDiamond } from 'react-icons/gi'

const Sites = () => {
    const { websites, isRefreshing } = useWebsite();
    const { GetWebsites, EditWebsite } = useSites();

    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');
    const buttonColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');

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
        >
            <HStack spacing='2em'>
                <VStack spacing='0' alignItems='flex-start'>
                    <Text variant='content_subtitle' mt='0'>
                        Your Mint Websites
                    </Text>
                    <Text fontSize='10pt'>
                        List of mint websites you own
                    </Text>
                </VStack>
                <Button size='sm' leftIcon={<MdRefresh fontSize='12pt' />} onClick={GetWebsites} disabled={isRefreshing}>
                    Refresh
                </Button>
            </HStack>
            <Wrap spacing='1.5em'>
                {websites?.map((website, idx) => (
                    <Button 
                        boxSize='180px'
                        position='relative' 
                        bgColor={buttonColor} 
                        cursor='pointer' 
                        borderRadius='10px'
                        key={idx}
                        overflow='hidden'
                        onClick={() => EditWebsite(idx)}
                    >
                        <Image 
                            position='absolute'
                            src={website?.components?.unrevealedImage}
                            alt='Website Logo' 
                            objectFit='cover' 
                            opacity='.1' 
                            boxSize='250px'
                            transform='rotate(10deg)'
                        />
                        {website.isPremium && (
                            <Tag
                                position='absolute'
                                bottom='4'
                            >
                                <TagLeftIcon as={GiCutDiamond} color='#08BDD4' />
                                <Text>
                                    Premium
                                </Text>
                            </Tag>
                        )}
                        {website.components.title}
                    </Button>
                ))}
            </Wrap>
        </VStack>
    )
}

export default Sites