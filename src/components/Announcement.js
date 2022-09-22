import { HStack, Text, Button, SlideFade, Link, useColorModeValue } from '@chakra-ui/react'
import { useMediaQuery } from 'react-responsive'
import { webColor } from '@/theme/index'

const Announcement = () => {
    const bgColor = useColorModeValue(webColor.announcementBg[0], webColor.announcementBg[1]);
    const btnColor = useColorModeValue('black', 'white');
    const isBreakdown = useMediaQuery({ query: '(max-width: 510px)' });

    return !isBreakdown && (
        <SlideFade in={true} offsetY='-20px' delay={.45}>
            <HStack
                bg={bgColor}
                w='full'
                p='1em'
                justifyContent='center'
                alignItems='center'
                boxShadow='lg'
            >
                <HStack>
                    <Text fontSize='10pt' color='white'>
                        Build cool mint websites with Premium Subscription 💎
                    </Text>
                    <Link href='/dashboard/getStarted' style={{ textDecoration: 'none' }} color={btnColor}>
                        <Button size='sm' variant='solid'>
                            Learn More
                        </Button>
                    </Link>
                </HStack>
            </HStack>
        </SlideFade>
    )
}

export default Announcement