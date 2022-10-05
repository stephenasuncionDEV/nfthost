import { Text, Flex, Wrap, Image, Heading, HStack } from '@chakra-ui/react'

const Pricing = () => {

    return (
        <Flex
            id='pricing'
            as='section'
            minH='90vh'
            bg='url(/assets/landing-bg-2.png) no-repeat center'
            bgSize='cover'
            flexDir='column'
            alignItems='center'
            p='2em'
            overflow='hidden'
        >
                <HStack position='relative' mt='2em'>
                <Heading as='h2' className='gradientPurple' fontSize='32pt'>
                    Our Pricing
                </Heading>
                <Image 
                    position='absolute'
                    left='105%'
                    src='/assets/landing-effect-4.png' 
                    alt='Landing Effect - Bar' 
                />
            </HStack>
            <Text fontSize='18pt' mt='.75em'>
                Always know what you'll pay
            </Text>
            <Image src='/assets/landing-effect-5.png' alt='Landing Effect - Arc' mt='1.5em' />
            <Wrap justify='center' my='4em' w='full' maxW='1200px' spacing='10em'>
                <Flex flexDir='column'>
                    <Text fontWeight='semibold'>
                        Collection Generator
                    </Text>
                    <HStack>
                        <Text fontWeight='bold' fontSize='18pt'>
                            Free or $25
                        </Text>
                        <Text variant='subtle'>
                            / Generation
                        </Text>
                    </HStack>
                </Flex>
                <Flex flexDir='column'>
                    <Text fontWeight='semibold'>
                        Minting Website Hosting
                    </Text>
                    <HStack>
                        <Text fontWeight='bold' fontSize='18pt'>
                            Free or $15
                        </Text>
                        <Text variant='subtle'>
                            / Website
                        </Text>
                    </HStack>
                </Flex>
                <Flex flexDir='column'>
                    <Text fontWeight='semibold'>
                        Metadata Utilities
                    </Text>
                    <HStack>
                        <Text fontWeight='bold' fontSize='18pt'>
                            Free or $15
                        </Text>
                        <Text variant='subtle'>
                            / Modification
                        </Text>
                    </HStack>
                </Flex>
            </Wrap>
        </Flex>
    )
}

export default Pricing