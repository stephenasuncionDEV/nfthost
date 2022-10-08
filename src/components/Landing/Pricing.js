import { Text, Flex, Wrap, Image, Heading, HStack, Box } from '@chakra-ui/react'

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
                <HStack position='relative' mt='1em'>
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
            <HStack spacing='2em' mt='2em'>
                <HStack>
                    <Box borderRadius='5px' p='.5em' bg='gray.600' />
                    <Text>
                        Free
                    </Text>
                </HStack>
                <HStack>
                    <Box borderRadius='5px' p='.5em' bg='rgb(117,63,229)' />
                    <Text>
                        Premium
                    </Text>
                </HStack>
            </HStack>
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
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='gray.600' />
                        <Text>&lt;= 100 Collection Size</Text>
                    </HStack>
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='gray.600' />
                        <Text>Metadata Editor</Text>
                    </HStack>
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='gray.600' />
                        <Text>Configurable Rarity</Text>
                    </HStack>
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='gray.600' />
                        <Text>Preview</Text>
                    </HStack>
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='gray.600' />
                        <Text>ETH &amp; SOL Metadata</Text>
                    </HStack>
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='rgb(117,63,229)' />
                        <Text>&gt; 100 Collection Size</Text>
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
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='gray.600' />
                        <Text>1x Minting Website</Text>
                    </HStack>
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='gray.600' />
                        <Text>3 Pre-built Templates</Text>
                    </HStack>
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='gray.600' />
                        <Text>Subdomain</Text>
                    </HStack>
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='rgb(117,63,229)' />
                        <Text>Unlimited Minting Website</Text>
                    </HStack>
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='rgb(117,63,229)' />
                        <Text>All Pre-built Templates</Text>
                    </HStack>
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='rgb(117,63,229)' />
                        <Text>Analytics</Text>
                    </HStack>
                </Flex>
                <Flex flexDir='column'>
                    <Text fontWeight='semibold'>
                        Metadata Utilities
                    </Text>
                    <HStack>
                        <Text fontWeight='bold' fontSize='18pt'>
                            Free or $5
                        </Text>
                        <Text variant='subtle'>
                            / Modification
                        </Text>
                    </HStack>
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='gray.600' />
                        <Text>Update Image Storage</Text>
                    </HStack>
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='rgb(117,63,229)' />
                        <Text>Add/Edit Metadata Key</Text>
                    </HStack>
                    <HStack w='full' maxW='250px' mt='2em'>
                        <Box borderRadius='5px' p='.5em' bg='rgb(117,63,229)' />
                        <Text>Remove Metadata Key</Text>
                    </HStack>
                </Flex>
            </Wrap>
        </Flex>
    )
}

export default Pricing