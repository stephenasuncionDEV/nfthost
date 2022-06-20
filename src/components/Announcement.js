import { HStack, Text, Button, SlideFade, Link } from '@chakra-ui/react'
import { useMediaQuery } from 'react-responsive'

const Announcement = () => {
    const isBreakdown = useMediaQuery({ query: '(max-width: 510px)' });

    return !isBreakdown && (
        <SlideFade in={true} offsetY='-20px' delay={.45}>
            <HStack
                bg='rgb(52,140,212)'
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
                    <Link href='/dashboard/getStarted' style={{ textDecoration: 'none' }}>
                        <Button size='sm'>
                            Learn More
                        </Button>
                    </Link>
                </HStack>
            </HStack>
        </SlideFade>
    )
}

export default Announcement