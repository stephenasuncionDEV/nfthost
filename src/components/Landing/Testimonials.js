import { Text, Flex, Wrap, Image, Heading, Link, Button } from '@chakra-ui/react'

const Testimonials = () => {

    return (
        <Flex
            id='testimonials'
            as='section'
            flexDir='column'
            minH='80vh'
            bg='rgb(0,6,22)'
            alignItems='center'
            p='2em'
        >
            <Heading as='h2' fontSize='32pt' textAlign='center' mt='1em'>
                Why clients love us
            </Heading>
            <Text fontSize='18pt' mt='.5em' textAlign='center'>
                We make it easier for NFT Creators to make their dream collections come true.
            </Text>
            <Link href='mailto:support@nfthost.app' style={{ color: 'white', textDecoration: 'none' }}>
                <Button mt='1em'>
                    Testify for Us ✋
                </Button>
            </Link>
            <Wrap spacing='4em' mt='4em' justify='center' overflow='visible' mx='2em'>
                <Image position='relative' src='/assets/testimony-1.png' alt='Testimony 1' className='upDownAnimation4'/>
                <Image position='relative' src='/assets/testimony-2.png' alt='Testimony 2' className='upDownAnimation4'/>
            </Wrap>
        </Flex>
    )
}

export default Testimonials